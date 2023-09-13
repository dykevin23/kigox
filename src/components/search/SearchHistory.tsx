import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  deleteAllHistory,
  deleteHistory,
  searchHistory,
} from "@services/search";
import { ISearchHistory } from "types/searchTypes";
import { Box } from "@components/layout";

interface SearchHistoryProps {
  onSearch: (history: string) => void;
}
const SearchHistory = ({ onSearch }: SearchHistoryProps) => {
  const queryClient = useQueryClient();
  const { data: history } = useQuery<ISearchHistory[]>(
    "searchHistory",
    searchHistory
  );

  const { mutate, isLoading, isSuccess } = useMutation(
    "deleteHistory",
    deleteHistory
  );

  const {
    mutate: mutateDeleteAll,
    isLoading: isLoadingDeleteAll,
    isSuccess: isSuccessDeleteAll,
  } = useMutation("deleteAllHistory", deleteAllHistory);

  const handleDelete = (id: number) => {
    if (isLoading) return;
    mutate(id);
  };

  const handleClick =
    (value: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      onSearch(value);
    };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries("searchHistory");
    }
  }, [isSuccess]);

  const getSearchDate = (date: string) => {
    const updatedAtDate = date.split("T")[0].replace(/\D/g, "");

    const today = new Date();
    if (String(today.getFullYear()) !== updatedAtDate.substring(0, 4)) {
      const calculateYear =
        today.getFullYear() - parseInt(updatedAtDate.substring(0, 4));

      if (calculateYear === 1) {
        return "작년";
      } else {
        return `${calculateYear} 년전`;
      }
    } else {
      return `${parseInt(updatedAtDate.substring(4, 6))}.${parseInt(
        updatedAtDate.substring(6, 8)
      )}`;
    }
  };

  const handleDeleteAll = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoadingDeleteAll) return;
    mutateDeleteAll();
  };

  useEffect(() => {
    if (isSuccessDeleteAll) {
      queryClient.invalidateQueries("searchHistory");
    }
  }, [isSuccessDeleteAll]);

  return history && history.length > 0 ? (
    <>
      <Box>
        <div className="flex items-center justify-between px-2">
          <span className="text-sm text-gray-600">최근검색</span>
          <span className="text-sm text-gray-600" onClick={handleDeleteAll}>
            전체삭제
          </span>
        </div>
      </Box>
      <Box>
        {history.map((item) => {
          return (
            <div
              key={item.id}
              onClick={handleClick(item.keyword)}
              className="flex py-1 gap-2 items-center justify-between px-2"
            >
              <div className="flex items-center justify-start gap-2 w-2/3 h-8">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{item.keyword}</span>
              </div>
              <div className="flex items-center justify-end gap-2 w-1/3 h-8">
                <span className="text-sm text-gray-700">
                  {getSearchDate(item.createdAt)}
                </span>
                <span
                  className="text-sm text-gray-700"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </span>
              </div>
            </div>
          );
        })}
      </Box>
    </>
  ) : (
    <div className="flex w-full h-full items-center justify-center bg-slate-300 py-3">
      <span>검색기록이 없습니다.</span>
    </div>
  );
};

export default SearchHistory;
