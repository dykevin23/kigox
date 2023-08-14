import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Layout } from "@components/layout";
import ProductDetail from "@components/products/productDetail";
import { productDetail } from "@services/products";
import { IProduct } from "types/productTypes";

const Product = () => {
  const router = useRouter();

  const { data: product, isSuccess } = useQuery<IProduct>(
    ["product", router.query.id],
    () => productDetail(router.query.id as string),
    { enabled: Boolean(router.query.id) }
  );

  useEffect(() => {
    if (isSuccess) console.log("### product => ", product);
  }, [product, isSuccess]);

  return (
    <Layout
      hasGnbMenu={false}
      headerProps={{
        left: "goBack",
      }}
    >
      <div className="flex flex-col gap-2 ">
        <ProductDetail product={product} />
      </div>
    </Layout>
  );
};

export default Product;
