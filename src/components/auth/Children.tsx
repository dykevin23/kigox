import { UseFieldArrayReturn, useFormContext } from "react-hook-form";

import { Button, Input, RadioGroup } from "@components/common/elements";
import { JoinForm } from "@pages/auth/join";
import { getFieldArrayError } from "@common/utils/helper/utils";

interface ChildrenProps {
  childrens: UseFieldArrayReturn<JoinForm>;
}

const Children = (props: ChildrenProps) => {
  const {
    childrens: { fields, append },
  } = props;

  const handleAddChild = () => {
    append({ nickname: "", birthday: "", gender: "male" });
  };

  return (
    <div className="flex flex-col gap-3 mt-3">
      <span>자녀정보</span>
      {fields.map((_, index: number) => {
        return <Child key={index} childIndex={index} />;
      })}
      <Button label="자녀추가" onClick={handleAddChild} />
    </div>
  );
};

interface ChildProps {
  childIndex: number;
}
const Child = (props: ChildProps) => {
  const { childIndex } = props;

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <span>{`자녀${childIndex + 1}`}</span>
      <Input
        name={`children.${childIndex}.nickname`}
        placeholder="닉네임을 입력해주세요.(10자 이내)"
        required="닉네임을 입력해주세요.(10자 이내)"
        errors={getFieldArrayError(errors, "children", childIndex, "nickname")}
      />
      <div className="flex justify-between">
        <Input
          name={`children.${childIndex}.birthday`}
          placeholder="생년월일(YYYY-MM-DD)"
          required="생년월일을 입력해주세요."
          errors={getFieldArrayError(
            errors,
            "children",
            childIndex,
            "birthday"
          )}
        />
        <RadioGroup
          name={`children.${childIndex}.gender`}
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
