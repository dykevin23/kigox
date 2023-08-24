import Head from "next/head";
import GnbBar from "@components/layout/GnbBar";
import Header, { HeaderProps } from "./Header";
import { cls } from "@common/utils/helper/utils";

interface LayoutProps {
  headerProps: HeaderProps;
  children: React.ReactNode;
  hasGnbMenu: boolean;
}

const Layout = (props: LayoutProps) => {
  const { headerProps, children, hasGnbMenu = false } = props;

  return (
    <>
      <Head>
        <title>kigox</title>
      </Head>
      <Header {...headerProps} />
      <div className={cls("pt-12 h-full", hasGnbMenu ? "pb-24" : "")}>
        {children}
      </div>
      {hasGnbMenu && <GnbBar />}
    </>
  );
};

export default Layout;
