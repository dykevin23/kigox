import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteHistory, searchHistory } from "@services/search";
import { ISearchHistory } from "types/searchTypes";

const SearchHistory = () => {
  const queryClient = useQueryClient();
  const { data: history } = useQuery<ISearchHistory[]>(
    "searchHistory",
    searchHistory
  );

  const { mutate, isLoading, isSuccess } = useMutation(
    "deleteHistory",
    deleteHistory
  );

  const handleDelete =
    (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (isLoading) return;
      mutate(id);
    };

  const handleClick =
    (value: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries("searchHistory");
    }
  }, [isSuccess]);

  return (
    <div>
      {history?.map((item) => {
        return (
          <div key={item.id} onClick={handleClick(item.keyword)}>
            <span>{item.keyword}</span>
            <span>{item.createdAt}</span>
            <button onClick={handleDelete(item.id)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchHistory;
