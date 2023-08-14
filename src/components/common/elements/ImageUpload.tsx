import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { downloadImagesUrl } from "@common/utils/helper/fileHelper";

interface ImageUploadProps {
  imageUrl?: string;
  onChange?: (file: FileList) => void;
}

const ImageUpload = (props: ImageUploadProps) => {
  const { imageUrl = "", onChange } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<FileList>();
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (imageUrl) {
      getImageUrl(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (image) {
      const file = image[0];
      setPreviewImage(URL.createObjectURL(file));
      onChange?.(image);
    } else {
      setPreviewImage("");
    }
  }, [image]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files);
    }
  };

  const getImageUrl = async (url: string) => {
    const result = await downloadImagesUrl(url);
    if (result) {
      console.log("### result => ", result);
      setPreviewImage(result);
    }
  };

  return (
    <>
      {previewImage ? (
        <Image
          alt="images"
          src={previewImage}
          width={100}
          height={100}
          className="w-full text-gray-600 rounded-md"
          onClick={() => {
            inputRef.current?.click();
          }}
        />
      ) : (
        <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
          <svg
            className="h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            ref={inputRef}
            accept="image/*"
            className="hidden"
            type="file"
            onChange={handleChange}
          />
        </label>
      )}
    </>
  );
};

export default ImageUpload;
