import { UseFieldArrayReturn, useFormContext } from "react-hook-form";

import { Button, Input, RadioGroup } from "@components/common/elements";
import { JoinForm } from "@pages/auth/join";
import { getFieldArrayError } from "@common/utils/helper/utils";

interface ChildrenProps {
  childrens: UseFieldArrayReturn<JoinForm>;
}

const Children = (props: ChildrenProps) => {
  const {
    childrens: { fields, append, remove },
  } = props;

  const handleAddChild = () => {
    append({ nickname: "", birthday: "", gender: "male" });
  };

  const handleDeleteChild =
    (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      remove(index);
    };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <div className="w-1 h-6 bg-amber-800" />
        <span className="text-lg font-medium text-amber-800">자녀정보</span>
      </div>
      <div>
        <span className="text-sm">
          자녀를 등록해주세요. 자녀를 미등록 시 추천 서비스 이용에 제한될 수
          있습니다.
        </span>
      </div>
      {fields.map((_, index: number) => {
        return (
          <Child
            key={index}
            childIndex={index}
            onDelete={handleDeleteChild(index)}
          />
        );
      })}
      <Button label="자녀추가" onClick={handleAddChild} />
    </div>
  );
};

interface ChildProps {
  childIndex: number;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Child = (props: ChildProps) => {
  const { childIndex, onDelete } = props;

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex justify-between mx-2 items-center">
        <span>{`자녀${childIndex + 1}`}</span>
        <div className="w-40 flex items-center justify-end">
          <Button
            label="삭제"
            onClick={onDelete}
            size="small"
            type="tetriary"
          />
        </div>
      </div>

      <Input
        name={`children.${childIndex}.nickname`}
        placeholder="닉네임을 입력해주세요.(10자 이내)"
        required="닉네임을 입력해주세요.(10자 이내)"
        error={getFieldArrayError(errors, "children", childIndex, "nickname")}
      />
      <div className="flex justify-between">
        <Input
          name={`children.${childIndex}.birthday`}
          placeholder="생년월일(YYYY-MM-DD)"
          required="생년월일을 입력해주세요."
          error={getFieldArrayError(errors, "children", childIndex, "birthday")}
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
