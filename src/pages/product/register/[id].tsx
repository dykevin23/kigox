import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { FormProvider, useForm } from "react-hook-form";

import { Form } from "@components/common/elements";
import { Container, Layout } from "@components/layout";
import { modifyProduct, productDetail } from "@services/products";
import { uploadImageFiles } from "@common/utils/helper/fileHelper";
import ProductInputForm, {
  IProductInputForm,
} from "@components/products/productInputForm";
import { IProduct } from "types/productTypes";
import { ProductRequestBody } from "@pages/api/products";

const Modify = () => {
  const router = useRouter();
  const modifyMethods = useForm<IProductInputForm>();

  const { data: product, isSuccess: isSuccessProduct } = useQuery<IProduct>(
    ["product", router.query.id],
    () => productDetail(router.query.id as string),
    { enabled: Boolean(router.query.id) }
  );

  const {
    mutate,
    isLoading,
    isSuccess: isSuccessModifyProduct,
  } = useMutation("modifyProduct", (data: ProductRequestBody) =>
    modifyProduct(router.query.id as string, data)
  );

  useEffect(() => {
    if (isSuccessProduct) {
      modifyMethods.setValue("imageUrl", product.image);
      modifyMethods.setValue("title", product.title);
      modifyMethods.setValue("mainCategory", product.mainCategory);
      modifyMethods.setValue("middleCategory", product.middleCategory);
      modifyMethods.setValue("price", product.price);
      modifyMethods.setValue("tradeMethod", product.tradeMethod);
      modifyMethods.setValue("tradeRegion", product.tradeRegion);
      modifyMethods.setValue("recommendAge", product.recommendAge);
      modifyMethods.setValue("gender", product.gender);
      modifyMethods.setValue("description", product.description);
    }
  }, [isSuccessProduct, product]);

  const onValid = async (data: IProductInputForm) => {
    if (isLoading) return;

    let getImageUrl = "";
    if (data.images) {
      const result = await uploadImageFiles(data.images);

      if (result) {
        getImageUrl = result.metadata.fullPath;
      }
    } else {
      getImageUrl = data.imageUrl;
    }

    if (getImageUrl) {
      mutate({
        imageUrl: getImageUrl,
        title: data.title,
        mainCategory: data.mainCategory,
        middleCategory: data.middleCategory,
        price: data.price,
        tradeMethod: data.tradeMethod,
        tradeRegion: data.tradeRegion,
        gender: data.gender,
        recommendAge: data.recommendAge,
        description: data.description,
      });
    }
  };

  useEffect(() => {
    if (isSuccessModifyProduct) {
      router.push("/", undefined, { shallow: true });
    }
  }, [isSuccessModifyProduct]);

  return (
    <Layout
      hasGnbMenu={false}
      headerProps={{ left: "goBack", center: <div>상품수정</div> }}
    >
      <Container>
        <FormProvider {...modifyMethods}>
          <Form onSubmit={modifyMethods.handleSubmit(onValid)} label="수정">
            <ProductInputForm />
          </Form>
        </FormProvider>
      </Container>
    </Layout>
  );
};

export default Modify;
