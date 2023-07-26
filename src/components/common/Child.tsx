import { IChild } from "types/userTypes";

interface ChildProps extends IChild {
  [key: string]: any;
}

const Child = (props: ChildProps) => {
  const { birthday, gender, childIndex, onChange } = props;
  return (
    <div>
      <input
        type="date"
        value={birthday}
        placeholder="생년월일(YYYY-MM-DD)"
        onChange={(e) => onChange({ birthday: e.target.value, gender })}
      />
      <div>
        <input
          type="radio"
          name={`gender${childIndex}`}
          value="male"
          checked={gender === "male"}
          onChange={(e) => onChange({ birthday, gender: e.target.value })}
        />{" "}
        남자
        <input
          type="radio"
          name={`gender${childIndex}`}
          value="female"
          checked={gender === "female"}
          onChange={(e) => onChange({ birthday, gender: e.target.value })}
        />{" "}
        여자
      </div>
    </div>
  );
};

export default Child;
