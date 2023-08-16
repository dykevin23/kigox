import { downloadImagesUrl } from "@common/utils/helper/fileHelper";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageViewProps {
  imagePath?: string;
}
const ImageView = ({ imagePath = "" }: ImageViewProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (imagePath) {
      (async () => {
        const result = await downloadImagesUrl(imagePath);

        if (result) {
          setImageUrl(result);
        }
      })();
    }
  }, [imagePath]);

  return (
    <Image
      alt="images"
      src={imageUrl}
      width={100}
      height={100}
      className="w-full h-full text-gray-600 rounded-md"
    />
  );
};

export default ImageView;
