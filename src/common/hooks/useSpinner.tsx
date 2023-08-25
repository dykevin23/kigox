import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIsFetching, useIsMutating } from "react-query";

import Spinner from "@components/layout/Spinner";

interface ContextProps {
  show: () => void;
  hide: () => void;
}

const SpinnerContext: React.Context<ContextProps> = createContext({
  show: () => {},
  hide: () => {},
});

export const SpinnerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(false);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    const handleRouteChangeStart = () => setIsShow(true);
    const handleRouteChangeComplete = () => setIsShow(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
  return (
    <SpinnerContext.Provider
      value={{
        show: () => setIsShow(true),
        hide: () => setIsShow(false),
      }}
    >
      {children}
      {(isShow || isFetching || isMutating) && <Spinner />}
    </SpinnerContext.Provider>
  );
};

const useSpinner = () => useContext(SpinnerContext);

export default useSpinner;
