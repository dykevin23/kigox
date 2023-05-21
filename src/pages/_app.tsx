import "../styles/globals.css";
import type { AppProps } from "next/app";
import firebase from "../firebase";

export default function App({ Component, pageProps }: AppProps) {
  // console.log("firebase => ", firebase);
  return (
    <div className="w-full max-w-lg mx-auto">
      <Component {...pageProps} />
    </div>
  );
}
