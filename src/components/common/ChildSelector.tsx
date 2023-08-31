import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useModal } from "@common/hooks";
import { IChild } from "types/userTypes";
import { ControlledRadio } from "./elements";

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
        className="flex justify-center items-center pl-2 gap-1"
        onClick={() => {
          if (isCanChange) {
            show({
              type: "slide",
              component: (
                <SelectChildren
                  childrens={session?.user.children as IChild[]}
                  activeChildId={session.activeChildId}
                  onChange={handleChangeChild}
                />
              ),
            });
          }
        }}
      >
        <span>
          {
            session.user.children.find(
              (item: IChild) => item.id === parseInt(session.activeChildId)
            ).nickname
          }
        </span>
        <svg
          className="h-3 w-3 font-medium"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          ></path>
        </svg>
      </div>
    </>
  ) : null;
};

interface SelectChildrenProps {
  childrens: IChild[];
  activeChildId: string;
  onChange: (value: any) => void;
}
const SelectChildren = ({
  childrens,
  activeChildId,
  onChange,
}: SelectChildrenProps) => {
  return (
    <div className="flex flex-col gap-3">
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
  onChange: (value: any) => void;
}
const Child = ({ child, isSelected, onChange }: ChildProps) => {
  return (
    <div className="flex mx-3 justify-between">
      <span>{child.nickname}</span>
      <ControlledRadio
        name="activeChild"
        value={child.id}
        isSelected={isSelected}
        onChange={onChange}
      />
    </div>
  );
};

export default ChildSelector;
