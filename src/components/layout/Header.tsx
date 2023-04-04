import { useRouter } from "next/router";
import Box from "@components/layout/Box";

export interface HeaderProps {
  goBack?: boolean;
  title: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  const { goBack, title = "", left, right } = props;
  return (
    <Box>
      <div className="flex bg-white w-full max-w-xl fixed top-0 border-b-2 items-center justify-start h-12">
        <div className="flex w-1/3">{goBack ? <GoBack /> : left}</div>
        <div className="flex justify-center w-1/3">{title}</div>
        <div className="flex justify-end w-1/3">{right}</div>
      </div>
    </Box>
  );
};

const GoBack = () => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <svg
      className="h-6 w-6 cursor-pointer"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      onClick={goBack}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      ></path>
    </svg>
  );
};

export default Header;
