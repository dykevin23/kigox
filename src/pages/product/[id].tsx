import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";

import { Container, Layout, Like } from "@components/layout";
import ProductDetail from "@components/products/productDetail";
import { favProduct, isFavProduct, productDetail } from "@services/products";
import { IProduct } from "types/productTypes";
import Edit from "@components/layout/Edit";

const Product = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: product, isSuccess } = useQuery<IProduct>(
    ["product", router.query.id],
    () => productDetail(router.query.id as string),
    { enabled: Boolean(router.query.id) }
  );

  const { data: isFav } = useQuery<boolean>(
    ["isFavProduct", product?.id],
    () => isFavProduct(product?.id as number),
    { enabled: Boolean(isSuccess && product) }
  );

  const {
    mutate: mutateFavProduct,
    isLoading: isLoadingFavProduct,
    isSuccess: isSuccessFavProduct,
  } = useMutation("favProduct", favProduct);

  useEffect(() => {
    if (isSuccess) console.log("### product => ", product);
  }, [product, isSuccess]);

  const moveProductEdit = () => {
    router.push(`/product/register/${router.query.id}`);
  };

  const handleFav = () => {
    if (isLoadingFavProduct) return;
    mutateFavProduct(product?.id as number);
  };

  useEffect(() => {
    if (isSuccessFavProduct)
      queryClient.invalidateQueries(["isFavProduct", product?.id]);
  }, [isSuccessFavProduct]);

  return (
    <Layout
      hasGnbMenu={false}
      headerProps={{
        left: "goBack",
        center: <div>상품상세</div>,
        right: (
          <>
            {session?.activeChildId === product?.childId ? (
              <Edit onClick={moveProductEdit} />
            ) : (
              <Like onClick={handleFav} isLiked={isFav} />
            )}
          </>
        ),
      }}
    >
      <Container>
        <ProductDetail
          product={product}
          isEditable={session?.activeChildId === product?.childId}
        />
      </Container>
    </Layout>
  );
};

export default Product;
