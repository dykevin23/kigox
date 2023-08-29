import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import { ModalProvider, SpinnerProvider } from "@common/hooks";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SpinnerProvider>
            <ModalProvider>
              <div className="w-full max-w-lg mx-auto h-screen">
                <Component {...pageProps} />
              </div>
            </ModalProvider>
          </SpinnerProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
