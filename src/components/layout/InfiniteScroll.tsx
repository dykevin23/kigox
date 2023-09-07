import { useEffect } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  onScroll: () => void;
}

const InfiniteScroll = ({ children, onScroll }: InfiniteScrollProps) => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      console.log("### fetch");
      onScroll();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div>{children}</div>;
};

export default InfiniteScroll;
