import { Layout, Search, Box } from "@components/layout";
import Product from "@components/products/product";

const Liked = () => {
  return (
    <Layout
      hasGnbMenu
      // headerProps={{
      //   title: "좋아요",
      //   goBack: true,
      //   right: <Search />,
      // }}
    >
      <Box>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <Product key={index} />
        ))}
      </Box>
    </Layout>
  );
};

export default Liked;
