import { useQuery } from "react-query";

import { Box, Layout } from "@components/layout";
import Product from "@components/products/product";
import { favsProducts } from "@services/products";
import { IProduct } from "types/productTypes";

const Favs = () => {
  const { data: products } = useQuery<IProduct[]>("favsProducts", favsProducts);

  return (
    <Layout headerProps={{ left: "goBack" }} hasGnbMenu={false}>
      <Box>
        <div className="flex flex-col space-y-3 divide-y">
          {products?.map((product: IProduct) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </Box>
    </Layout>
  );
};

export default Favs;
