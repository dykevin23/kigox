interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = (props: ModalProps) => {
  const { isOpen, children, onClose } = props;
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white w-3/4 rounded-md p-4 transform transition-transform">
        {children}
      </div>
    </div>
  );
};

export default Modal;
