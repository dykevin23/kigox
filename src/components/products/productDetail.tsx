import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

import { Button, ImageView, List } from "@components/common/elements";
import { IProduct } from "types/productTypes";
import { IChild, IUser } from "types/userTypes";
import { selectChannel, createChannel } from "@services/chat";
import { IChannel } from "types/chatTypes";
import { useFirestoreMutation } from "@common/hooks";
import { Box, Card, Container } from "@components/layout";
import { convertCurrency } from "@common/utils/helper/utils";
import { GENDER, TRADE_METHOD } from "@common/constants/server";
import { getUser } from "@services/users";

interface ProductDetailProps {
  product?: IProduct;
  isEditable: boolean;
}

const ProductDetail = (props: ProductDetailProps) => {
  const { product, isEditable = false } = props;

  const router = useRouter();
  const { data: session } = useSession();

  const [isChatable, setIsChatable] = useState(false);
  const [partnerId, setPartnerId] = useState<string>("");

  const { data: salesUser } = useQuery<IUser>(
    ["getUser", product?.childId],
    () => getUser(product?.childId as number),
    { enabled: Boolean(product?.childId) }
  );

  useEffect(() => {
    console.log("### salesUser => ", salesUser);
  }, [salesUser]);

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

  const { mutateFb, isLoadingFb, isSuccessFb, id } = useFirestoreMutation();

  useEffect(() => {
    const isOtherParent =
      session?.user.children.filter(
        (item: IChild) => item.id === product?.childId
      ).length === 0;

    setIsChatable(isOtherParent);
  }, [session, product]);

  const handleChat = () => {
    setPartnerId(String(product?.childId));
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
      <Box>
        <div className="h-72">
          <ImageView imagePath={product?.image} />
        </div>
      </Box>

      <Box>
        <Card bgColor="bg-slate-200">
          <div className="flex items-center">
            <span className="text-lg font-medium">{product?.title}</span>
            <span className="text-sm pl-1">
              ({product?.status === "sale" ? "판매중" : "판매완료"})
            </span>
          </div>
          <div className="w-full h-16">{product?.description}</div>
        </Card>
      </Box>

      <Box>
        <List>
          <List.Item justifyContent="between">
            <List.ItemLabel>가격</List.ItemLabel>
            <List.ItemValue>
              {convertCurrency(product?.price as string)} 원
            </List.ItemValue>
          </List.Item>
          {product?.gender && (
            <List.Item justifyContent="between">
              <List.ItemLabel>성별</List.ItemLabel>
              <List.ItemValue>
                {GENDER[product?.gender as string]}아
              </List.ItemValue>
            </List.Item>
          )}
          <List.Item justifyContent="between">
            <List.ItemLabel>거래선호방식</List.ItemLabel>
            <List.ItemValue>
              {TRADE_METHOD[product?.tradeMethod as string]}
            </List.ItemValue>
          </List.Item>
          <List.Item justifyContent="between">
            <List.ItemLabel>거래지역</List.ItemLabel>
            <List.ItemValue>{product?.tradeRegion}</List.ItemValue>
          </List.Item>
        </List>
      </Box>

      {isChatable && <Button label="채팅하기" onClick={handleChat} />}
    </Container>
  );
};

export default ProductDetail;
