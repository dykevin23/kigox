import Image from "next/image";

import { TRADE_METHOD } from "@common/constants/server";
import { IProduct } from "types/productTypes";

interface ProductProps {
  product: IProduct;
  onClick?: (productId: string) => void;
}
const Product = (props: ProductProps) => {
  const {
    product: { id, title, price, tradeMethod, image = "" },
    onClick,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onClick?.(id + "");
  };

  return (
    <div className="flex gap-2 pt-3 w-full" onClick={handleClick}>
      <Image
        alt="images"
        src={image}
        width={100}
        height={100}
        className="bg-slate-300 h-28 w-28 rounded-md"
      />
      <div className="flex flex-col w-64">
        <span>{title}</span>
        <span>{price}원</span>
        <span>{TRADE_METHOD[tradeMethod]} (판매중)</span>
        <div className="flex justify-between pt-4">
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              ></path>
            </svg>
            1
          </div>

          <span>11시간 전</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
