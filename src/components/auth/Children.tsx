import { Button, Input, RadioGroup } from "@components/common/elements";
import { JoinForm } from "@pages/auth/join";
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";

interface ChildrenProps {
  childrens: UseFieldArrayReturn<JoinForm>;
  register: UseFormRegister<JoinForm>;
}

const Children = (props: ChildrenProps) => {
  const {
    childrens: { fields, append },
    register,
  } = props;

  const handleAddChild = () => {
    append({ nickname: "", birthday: "", gender: "male" });
  };

  return (
    <div className="flex flex-col gap-3 mt-3">
      <span>자녀정보</span>
      {fields.map((_, index: number) => {
        return <Child key={index} childIndex={index} register={register} />;
      })}
      <Button label="자녀추가" onClick={handleAddChild} />
    </div>
  );
};

interface ChildProps {
  childIndex: number;
  register: UseFormRegister<JoinForm>;
}
const Child = (props: ChildProps) => {
  const { childIndex, register } = props;
  return (
    <div className="flex flex-col gap-1">
      <span>{`자녀${childIndex + 1}`}</span>
      <Input
        register={register(`children.${childIndex}.nickname`, {
          required: "닉네임을 입력해주세요.(10자 이내)",
        })}
        name="nickname"
        placeholder="닉네임을 입력해주세요.(10자 이내)"
      />
      <div className="flex justify-between">
        <Input
          register={register(`children.${childIndex}.birthday`, {
            required: "생년월일을 입력해주세요.",
          })}
          name="birthday"
          placeholder="생년월일(YYYY-MM-DD)"
        />
        <RadioGroup
          register={register(`children.${childIndex}.gender`)}
          name="gender"
          options={[
            { label: "남자", value: "male" },
            { label: "여자", value: "female" },
          ]}
          defaultValue="male"
        />
      </div>
    </div>
  );
};

export default Children;
