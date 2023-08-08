import { activeChildAtom } from "@recoil/atoms/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import LayerModal from "./elements/LayerModal";
import useLayerModal from "@common/hooks/useLayerModal";
import { IChild } from "types/userTypes";
import { Radio } from "./elements";

const ChildSelector = () => {
  const { data: session } = useSession();
  const [child, setChild] = useRecoilState<IChild>(activeChildAtom);
  const [isCanChange, setIsCanChange] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { show, hide } = useLayerModal();

  useEffect(() => {
    if (session) {
      const { user } = session;
      if (user.children.length === 1) setIsCanChange(false);
    }
  }, [child, session]);

  const handleChangeChild = (childId: string) => {
    const getChild = session?.user.children.find(
      (child: IChild) => child.id === parseInt(childId)
    );
    if (getChild) {
      setChild(getChild);
      localStorage.setItem("activeChildId", childId);
    }

    hide();
  };

  return (
    <>
      <div
        onClick={() => {
          if (isCanChange) {
            show(
              <SelectChildren
                childrens={session?.user.children as IChild[]}
                selectedChild={child}
                onChange={handleChangeChild}
              />
            );
          }
        }}
      >
        {child.id}
      </div>
    </>
  );
};

interface SelectChildrenProps {
  childrens: IChild[];
  selectedChild: IChild;
  onChange: Function;
}
const SelectChildren = ({
  childrens,
  selectedChild,
  onChange,
}: SelectChildrenProps) => {
  return (
    <div>
      {childrens.map((child: IChild, index: number) => (
        <Child
          key={index}
          child={child}
          isSelected={child.id === selectedChild.id}
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
