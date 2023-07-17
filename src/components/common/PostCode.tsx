import { kakaoApi } from "@common/utils/client/kakaoInstances";
import DaumPostCode, { useDaumPostcodePopup } from "react-daum-postcode";

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

const PostCode = ({ onComplete }: PostCodeProps) => {
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
    <button type="button" onClick={handleClick}>
      우편번호 검색
    </button>
  );
};

export default PostCode;
