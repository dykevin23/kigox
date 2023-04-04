import { Layout } from "@components/layout";

const Search = () => {
  return (
    <Layout
      hasGnbMenu
      headerProps={{
        title: <input />,
        goBack: true,
      }}
    >
      <div>search</div>
    </Layout>
  );
};

export default Search;
