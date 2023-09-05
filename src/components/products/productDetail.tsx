import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

import { Button, ImageView } from "@components/common/elements";
import { IProduct } from "types/productTypes";
import { IChild } from "types/userTypes";
import { selectChannel, createChannel } from "@services/chat";
import { IChannel } from "types/chatTypes";
import { useFirestoreMutation } from "@common/hooks";
import { favProduct } from "@services/products";
import { Container } from "@components/layout";

interface ProductDetailProps {
  product?: IProduct;
}

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const router = useRouter();
  const { data: session } = useSession();

  const [isEditable, setIsEditable] = useState(false);
  const [isChatable, setIsChatable] = useState(false);
  const [partnerId, setPartnerId] = useState<string>("");

  const { data, isSuccess } = useQuery<IChannel>(
    ["selectChannel", partnerId],
    () => selectChannel(partnerId),
    { enabled: Boolean(partnerId) }
  );

  const {
    mutate,
    isLoading,
    isSuccess: isSuccessCreateChannel,
    variables,
  } = useMutation("createChannel", createChannel);
  const {
    mutate: mutateFavProduct,
    isLoading: isLoadingFavProduct,
    isSuccess: isSuccessFavProduct,
  } = useMutation("favProduct", favProduct);

  const { mutateFb, isLoadingFb, isSuccessFb, id } = useFirestoreMutation();

  useEffect(() => {
    const isMyProduct =
      parseInt(session?.activeChildId as string) === product?.childId;
    const isOtherParent =
      session?.user.children.filter(
        (item: IChild) => item.id === product?.childId
      ).length === 0;

    setIsEditable(isMyProduct);
    setIsChatable(isOtherParent);
  }, [session, product]);

  const handleChat = () => {
    setPartnerId(String(product?.childId));
  };

  const handleFav = () => {
    if (isLoadingFavProduct) return;
    mutateFavProduct(String(product?.id));
  };

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        router.push(`/chat/${data.channelId}`);
      } else {
        if (isLoadingFb) return;
        mutateFb({ data: {}, dataPath: "channel" });
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isSuccessFb) {
      if (!isLoading) {
        mutate({ channelId: id, createForId: partnerId });
      }
    }
  }, [id, isSuccessFb]);

  useEffect(() => {
    if (isSuccessCreateChannel) {
      router.push(`/chat/${variables?.channelId}`);
    }
  }, [isSuccessCreateChannel, variables]);

  return (
    <Container>
      <ImageView imagePath={product?.image} />

      <div className="w-full h-40 bg-yellow-300 px-3 py-2">
        <div className="flex">
          <span>
            {product?.title} (
            {product?.status === "sale" ? "판매중" : "판매완료"})
          </span>
        </div>
        <div className="w-full h-16">{product?.description}</div>
      </div>
      <div className="flex justify-end">
        <span>{product?.price}원</span>
      </div>
      <div className="flex justify-between">
        <span>{product?.gender}</span>
        <span>{product?.tradeRegion}</span>
      </div>

      <Button label="좋아요" onClick={handleFav} />
      {isChatable && <Button label="채팅하기" onClick={handleChat} />}
      {isEditable && <Button label="수정하기" />}
    </Container>
  );
};

export default ProductDetail;
