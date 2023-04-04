import Head from "next/head";
import GnbBar from "@components/layout/GnbBar";
import Header, { HeaderProps } from "./Header";

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
      <div>{children}</div>
      {hasGnbMenu && <GnbBar />}
    </>
  );
};

export default Layout;
