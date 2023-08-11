import { Layout, Box } from "@components/layout";
import Product from "@components/products/product";

const Liked = () => {
  return (
    <Layout
      hasGnbMenu
      headerProps={{
        left: "goBack",
      }}
    >
      <Box>
        <div>좋아요</div>
        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <Product key={index} />
        ))} */}
      </Box>
    </Layout>
  );
};

export default Liked;
