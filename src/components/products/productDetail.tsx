import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Button, ImageView } from "@components/common/elements";
import { IProduct } from "types/productTypes";
import { IChild } from "types/userTypes";

interface ProductDetailProps {
  product?: IProduct;
}

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const { data: session } = useSession();

  const [isEditable, setIsEditable] = useState(false);
  const [isChatable, setIsChatable] = useState(false);

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

  return (
    <div className="flex flex-col gap-2">
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

      {isChatable && <Button label="채팅하기" />}
      {isEditable && <Button label="수정하기" />}
    </div>
  );
};

export default ProductDetail;
