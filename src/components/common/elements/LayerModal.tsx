interface LayerModalProps {
  children: React.ReactNode;
  onClose: Function;
}

const LayerModal = ({ children, onClose }: LayerModalProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-center z-50">
      {/* 실제 모달 내용 */}
      <div className="bg-blue-300 w-full p-8 rounded-t-md shadow-md transform transition-transform duration-300 ease-in-out translate-y-0 sm:translate-y-full">
        {children}
      </div>
    </div>
  );
};

export default LayerModal;
