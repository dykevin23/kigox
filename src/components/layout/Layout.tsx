import Head from "next/head";
import GnbBar from "@components/layout/GnbBar";
import Header, { HeaderProps } from "./Header";
import { cls } from "@common/utils/helper/utils";

interface LayoutProps {
  hasHeader?: boolean;
  headerProps?: HeaderProps;
  children: React.ReactNode;
  hasGnbMenu: boolean;
}

const Layout = (props: LayoutProps) => {
  const { hasHeader = true, headerProps, children, hasGnbMenu = false } = props;

  return (
    <>
      <Head>
        <title>kigox</title>
      </Head>
      {hasHeader && <Header {...headerProps} />}
      <div
        className={cls(
          "h-full",
          hasHeader ? "pt-12" : "",
          hasGnbMenu ? "pb-24" : ""
        )}
      >
        {children}
      </div>
      {hasGnbMenu && <GnbBar />}
    </>
  );
};

export default Layout;
