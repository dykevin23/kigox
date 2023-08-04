import { Layout } from "@components/layout";

const Store = () => {
  return (
    <Layout hasGnbMenu headerProps={{ left: "childSelector" }}>
      <div>Store</div>
    </Layout>
  );
};

export default Store;
