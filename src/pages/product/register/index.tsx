import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";

import { Container, Layout } from "@components/layout";
import { registProduct } from "@services/products";
import { deleteFile, uploadImageFiles } from "@common/utils/helper/fileHelper";
import ProductInputForm, {
  IProductInputForm,
} from "@components/products/productInputForm";
import { Form } from "@components/common/elements";

const Register = () => {
  const router = useRouter();
  const registerMethods = useForm<IProductInputForm>();

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    "registProduct",
    registProduct
  );

  const onInValid = (error: FieldErrors) => {
    console.log("### onInValid => ", error);
  };

  const onValid = async (data: IProductInputForm) => {
    if (isLoading) return;

    const getImageUrl = await uploadImageFiles(data.images);

    if (getImageUrl) {
      mutate({
        imageUrl: getImageUrl.metadata.fullPath,
        title: data.title,
        mainCategory: data.mainCategory,
        middleCategory: data.middleCategory,
        tradeMethod: data.tradeMethod,
        tradeRegion: data.tradeRegion,
        price: data.price,
        recommendAge: data.recommendAge,
        gender: data.gender,
        description: data.description,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/", undefined, { shallow: true });
    }

    if (isError) {
      deleteImageFile();
    }
  }, [isSuccess, isError]);

  const deleteImageFile = async () => {
    const file = registerMethods.getValues("images");
    const deleteResult = await deleteFile(file[0].name);

    // if (deleteResult) {
    //   router.push("/", undefined, { shallow: true });
    // }
  };

  return (
    <Layout
      hasGnbMenu={false}
      headerProps={{ left: "goBack", center: <div>상품등록</div> }}
    >
      <Container>
        <FormProvider {...registerMethods}>
          <Form
            onSubmit={registerMethods.handleSubmit(onValid, onInValid)}
            label="등록"
          >
            <ProductInputForm />
          </Form>
        </FormProvider>
      </Container>
    </Layout>
  );
};

export default Register;
