import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GnbBar from "@/components/layout/GnbBar";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  hasGnbMenu: boolean;
}

const Layout = (props: LayoutProps) => {
  const { title = "", children, hasGnbMenu = false } = props;

  return (
    <>
      <Head>
        <title>kigox</title>
      </Head>
      <div>{children}</div>
      {hasGnbMenu && <GnbBar />}
    </>
  );
};

export default Layout;
