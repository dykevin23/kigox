import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Container, Layout } from "@components/layout";
import ProductDetail from "@components/products/productDetail";
import { productDetail } from "@services/products";
import { IProduct } from "types/productTypes";
import Edit from "@components/layout/Edit";

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

  const moveProductEdit = () => {
    router.push(`/product/register/${router.query.id}`);
  };

  return (
    <Layout
      hasGnbMenu={false}
      headerProps={{
        left: "goBack",
        right: (
          <>
            <Edit onClick={moveProductEdit} />
          </>
        ),
      }}
    >
      <Container>
        <ProductDetail product={product} />
      </Container>
    </Layout>
  );
};

export default Product;
