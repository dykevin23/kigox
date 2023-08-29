import { LayerModal, Modal } from "@components/common/elements";
import React, { createContext, useContext, useState } from "react";

interface IModalShowProps {
  type: ModalType;
  component: React.ReactNode;
}
interface ContextProp {
  show: (props: IModalShowProps) => void;
  hide: () => void;
}

const ModalContext: React.Context<ContextProp> = createContext({
  show: (props: IModalShowProps) => {},
  hide: () => {},
});

type ModalType = "slide" | "popup";

interface IModal {
  visible: boolean;
  component: React.ReactNode | null;
  type: ModalType;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<IModal>({
    visible: false,
    component: null,
    type: "popup",
  });

  const handleCloseModal = () => {
    setModal({ visible: false, component: null, type: "popup" });
  };

  return (
    <ModalContext.Provider
      value={{
        show: ({ type, component }: IModalShowProps) => {
          setModal({ visible: true, component, type });
        },
        hide: handleCloseModal,
      }}
    >
      {children}
      {modal.visible &&
        (modal.type === "popup" ? (
          <Modal isOpen={modal.visible} onClose={handleCloseModal}>
            {modal.component}
          </Modal>
        ) : (
          <LayerModal isOpen={modal.visible} onClose={handleCloseModal}>
            {modal.component}
          </LayerModal>
        ))}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export default useModal;
