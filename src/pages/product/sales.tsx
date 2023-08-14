import { useQuery } from "react-query";
import { useRouter } from "next/router";

import { Box, Layout } from "@components/layout";
import Product from "@components/products/product";
import { salesProducts } from "@services/products";
import { IProduct } from "types/productTypes";

const Sales = () => {
  const router = useRouter();
  const { data: products } = useQuery<IProduct[]>(
    "salesProducts",
    salesProducts
  );

  const handleClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Layout headerProps={{ left: "goBack" }} hasGnbMenu={false}>
      <Box>
        <div className="flex flex-col space-y-3 divide-y">
          {products?.map((product: IProduct) => (
            <Product key={product.id} product={product} onClick={handleClick} />
          ))}
        </div>
      </Box>
    </Layout>
  );
};

export default Sales;
