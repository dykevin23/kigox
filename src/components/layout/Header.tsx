import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import ChildSelector from "@components/common/ChildSelector";

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
    <div className="flex bg-white w-full max-w-xl fixed top-0 border-b-2 items-center justify-start h-12 p-2">
      {custom ? (
        <div className="flex justify-center w-full">{custom}</div>
      ) : (
        <>
          <div className="flex justify-start w-full">
            {left === "childSelector" && session?.activeChildId && (
              <ChildSelector />
            )}
            {left === "goBack" && <GoBack />}
          </div>
          <div className="flex justify-center w-full">{center}</div>
          <div className="flex justify-end w-full gap-2">{right}</div>
        </>
      )}
    </div>
  );
};

export const GoBack = () => {
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
