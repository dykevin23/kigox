import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import { LayerModalProvider } from "@common/hooks/useLayerModal";

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
          <LayerModalProvider>
            <div className="w-full max-w-lg mx-auto">
              <Component {...pageProps} />
            </div>
          </LayerModalProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
