import { Layout } from "@components/layout";
import { productDetail } from "@services/products";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { IProduct } from "types/productTypes";

const ProductDetail = () => {
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
      <div>상세보기</div>
    </Layout>
  );
};

export default ProductDetail;
