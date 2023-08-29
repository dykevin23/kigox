import { LayerModal } from "@components/common/elements";
import { createContext, useContext, useState } from "react";

interface ContextProp {
  show: (component: React.ReactNode) => void;
  hide: () => void;
}

const ModalContext: React.Context<ContextProp> = createContext({
  show: (component: React.ReactNode) => {},
  hide: () => {},
});

interface IModal {
  visible: boolean;
  component: React.ReactNode | null;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<IModal>({
    visible: false,
    component: null,
  });

  const handleCloseModal = () => {
    setModal({ visible: false, component: null });
  };

  return (
    <ModalContext.Provider
      value={{
        show: (component: React.ReactNode) => {
          setModal({ visible: true, component });
        },
        hide: handleCloseModal,
      }}
    >
      {children}
      {modal.visible && (
        <LayerModal isOpen={modal.visible} onClose={handleCloseModal}>
          {modal.component}
        </LayerModal>
      )}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export default useModal;
