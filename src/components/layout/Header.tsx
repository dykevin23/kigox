import { useRouter } from "next/router";

import ChildSelector from "@components/common/ChildSelector";
import Box from "./Box";
import { useSession } from "next-auth/react";

type HeaderLeft = "childSelector" | "goBack";

export interface HeaderProps {
  custom?: React.ReactNode;
  left?: HeaderLeft;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  const { left, center, right, custom } = props;

  const { data: session } = useSession();

  return (
    <Box>
      <div className="flex bg-white w-full max-w-xl fixed top-0 border-b-2 items-center justify-start h-12">
        {custom ? (
          <div className="flex justify-center w-full">{custom}</div>
        ) : (
          <>
            <div className="flex justify-start w-full  bg-red-500">
              {left === "childSelector" && session?.activeChildId && (
                <ChildSelector />
              )}
              {left === "goBack" && <GoBack />}
            </div>
            <div className="flex justify-center w-full  bg-blue-500">
              {center}
            </div>
            <div className="flex justify-end w-full  bg-green-500">{right}</div>
          </>
        )}
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
