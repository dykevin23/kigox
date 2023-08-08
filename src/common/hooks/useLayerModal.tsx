import LayerModal from "@components/common/elements/LayerModal";
import { createContext, useContext, useState } from "react";

interface ContextProp {
  show: (component: React.ReactNode) => void;
  hide: () => void;
}

const LayerModalContext: React.Context<ContextProp> = createContext({
  show: (component: React.ReactNode) => {},
  hide: () => {},
});

interface IModal {
  visible: boolean;
  component: React.ReactNode | null;
}

interface LayerModalProviderProps {
  children: React.ReactNode;
}

export const LayerModalProvider = ({ children }: LayerModalProviderProps) => {
  const [modal, setModal] = useState<IModal>({
    visible: false,
    component: null,
  });

  const handleCloseModal = () => {
    setModal({
      visible: false,
      component: null,
    });
  };

  return (
    <LayerModalContext.Provider
      value={{
        show: (component: React.ReactNode) => {
          setModal({ visible: true, component });
        },
        hide: handleCloseModal,
      }}
    >
      {children}
      {modal.visible && (
        <div className="z-40 flex w-full h-full bg-gray-400">dim</div>
      )}
      {modal.visible && (
        <LayerModal onClose={handleCloseModal}>{modal.component}</LayerModal>
      )}
    </LayerModalContext.Provider>
  );
};

const useLayerModal = () => useContext(LayerModalContext);

export default useLayerModal;
