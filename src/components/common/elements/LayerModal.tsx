import "animate.css";

interface LayerModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
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
        <div className="flex justify-end mb-3">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayerModal;
