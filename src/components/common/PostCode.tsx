import { FieldErrors, UseFormRegister } from "react-hook-form";
import DaumPostCode, { useDaumPostcodePopup } from "react-daum-postcode";

import { kakaoApi } from "@common/utils/client/kakaoInstances";
import { Button, Input } from "@components/common/elements";
import { JoinForm } from "@pages/auth/join";

export interface AddressCoords {
  longitude: string | null;
  latitude: string | null;
}

interface PostCodeResponse extends AddressCoords {
  zonecode: string;
  address: string;
}

interface PostCodeProps {
  onComplete: (data: PostCodeResponse) => void;
}

const PostCode = (props: PostCodeProps) => {
  const { onComplete } = props;

  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = async (data: any) => {
    const result: any = await kakaoApi({
      url: `https://dapi.kakao.com/v2/local/search/address.json`,
      method: "GET",
      params: { query: data.address },
    });

    if (result) {
      const {
        data: { documents },
      } = result;

      onComplete({
        zonecode: data.zonecode,
        address: data.roadAddress,
        longitude: documents && documents.length > 0 ? documents[0].x : "0",
        latitude: documents && documents.length > 0 ? documents[0].y : "0",
      });
    }
  };

  const handleClick = () => open({ onComplete: handleComplete });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center items-center gap-2">
        <Input name="zonecode" readonly={true} placeholder="우편번호" />
        <Button label="우편번호 검색" onClick={handleClick} />
      </div>
      <Input name="address" readonly placeholder="주소 입력" />
      <Input
        name="detailAddress"
        placeholder="상세주소 입력"
        required="상세주소를 입력하세요."
      />
    </div>
  );
};

export default PostCode;
