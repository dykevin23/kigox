import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useModal } from "@common/hooks";
import { IChild } from "types/userTypes";
import { Radio } from "./elements";

const ChildSelector = () => {
  const { data: session, update } = useSession();
  const [isCanChange, setIsCanChange] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { show, hide } = useModal();

  useEffect(() => {
    if (session) {
      const { user } = session;
      if (user.children.length === 1) setIsCanChange(false);
    }
  }, [session]);

  const handleChangeChild = (childId: string) => {
    const getChild = session?.user.children.find(
      (child: IChild) => child.id === parseInt(childId)
    );
    if (getChild) {
      update({ activeChildId: getChild.id });
    }

    hide();
  };

  return session?.activeChildId ? (
    <>
      <div
        onClick={() => {
          if (isCanChange) {
            show(
              <SelectChildren
                childrens={session?.user.children as IChild[]}
                activeChildId={session.activeChildId}
                onChange={handleChangeChild}
              />
            );
          }
        }}
      >
        {session.activeChildId}
      </div>
    </>
  ) : null;
};

interface SelectChildrenProps {
  childrens: IChild[];
  activeChildId: string;
  onChange: Function;
}
const SelectChildren = ({
  childrens,
  activeChildId,
  onChange,
}: SelectChildrenProps) => {
  return (
    <div>
      {childrens.map((child: IChild, index: number) => (
        <Child
          key={index}
          child={child}
          isSelected={child.id === parseInt(activeChildId)}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

interface ChildProps {
  child: IChild;
  isSelected: boolean;
  onChange: Function;
}
const Child = ({ child, isSelected, onChange }: ChildProps) => {
  return (
    <div>
      <span>{child.nickname}</span>
      <Radio
        name="isSelected"
        value={child.id}
        isSelected={isSelected}
        onChange={onChange}
      />
    </div>
  );
};

export default ChildSelector;
