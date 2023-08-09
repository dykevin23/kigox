import { MouseEventHandler } from "react";

interface LayerModalProps {
  children: React.ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const LayerModal = ({ children, onClose }: LayerModalProps) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center ">
      <div
        className="fixed inset-0 bg-black opacity-50 z-30"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center z-50 bg-white rounded-t-md shadow-md">
        {/* 실제 모달 내용 */}
        <div className=" w-full p-8 rounded-t-md shadow-md transform transition-transform duration-300 ease-in-out translate-y-0 sm:translate-y-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayerModal;
