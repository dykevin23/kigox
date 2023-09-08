import { useEffect } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  onScroll: () => void;
}

const InfiniteScroll = ({
  children,
  hasNextPage,
  isFetching,
  onScroll,
}: InfiniteScrollProps) => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetching) onScroll();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]);

  return <div>{children}</div>;
};

export default InfiniteScroll;
