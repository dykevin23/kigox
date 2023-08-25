import { MouseEventHandler } from "react";
import "animate.css";

interface LayerModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const LayerModal = ({ isOpen = false, children, onClose }: LayerModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div
        className={`bg-white p-4 rounded-t-lg shadow-lg transform transition-transform absolute bottom-0 w-full sm:w-96 animate__animated ${
          isOpen ? "animate__slideInUp " : "animate__slideOutDown "
        } custom-slide-animation`}
      >
        {children}
      </div>
    </div>
  );
};

export default LayerModal;
