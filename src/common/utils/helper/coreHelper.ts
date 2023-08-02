import { IStandard } from "types/metadataType";
import { getToday } from "./dateHelper";
import { IStandardChild } from "@pages/api/products";

export const calculateAge = (birthday: string) => {
  const today = getToday();
  const year = today.substring(0, 4);
  const birthYear = birthday.substring(0, 4);

  if (
    parseInt(today.substring(4)) >=
    parseInt(birthday.replaceAll("-", "").substring(4))
  ) {
    return parseInt(year) - parseInt(birthYear);
  } else {
    return parseInt(year) - parseInt(birthYear) - 1;
  }
};

export const getStandardData = (
  key: string,
  data: any,
  standards: IStandard[]
) => {
  const result = standards
    .filter((item) => item.key === key)
    .find((item) => {
      if (item.standardType === "fixed") {
        return item.value === data;
      } else {
        if (data < 0) {
          return true;
        } else {
          return (
            parseInt(item.min as string) <= parseInt(data) &&
            (item.max ? parseInt(item.max as string) >= parseInt(data) : true)
          );
        }
      }
    });

  return result?.score ?? 0;
};

export const getMaxStandardData = (
  list: IStandardChild[],
  standardData: IStandard[]
) => {
  const maxParentAge = Math.max(...list.map((item) => item.parentAge));
  const maxParentGender = Math.max(...list.map((item) => item.parentGender));
  const maxIncomeRange = Math.max(...list.map((item) => item.incomeRange));
  const maxChildAge = Math.max(...list.map((item) => item.childAge));
  const maxChildGender = Math.max(...list.map((item) => item.childGender));

  const parentAgeWeight = standardData.find(
    (item) => item.key === "age"
  )?.weight;
  const parentGenderWeight = standardData.find(
    (item) => item.key === "gender"
  )?.weight;
  const incomeWeight = standardData.find(
    (item) => item.key === "incomeRange"
  )?.weight;
  const childAgeWeight = standardData.find(
    (item) => item.key === "childAge"
  )?.weight;
  const childGenderWeight = standardData.find(
    (item) => item.key === "childGender"
  )?.weight;

  return {
    parentAge: { value: maxParentAge, weight: parentAgeWeight },
    parentGender: { value: maxParentGender, weight: parentGenderWeight },
    incomeRange: { value: maxIncomeRange, weight: incomeWeight },
    childAge: { value: maxChildAge, weight: childAgeWeight },
    childGender: { value: maxChildGender, weight: childGenderWeight },
  };
};

interface disparityRateProps {
  me: IStandardChild;
  children: IStandardChild[];
  standard: any;
}
export const calculateDisparityRate = (props: disparityRateProps) => {
  const { me, children, standard } = props;

  const calculate = (
    value1: number,
    value2: number,
    maxValue: number,
    weight: number
  ) => {
    const weightRate = parseFloat((weight / 100).toFixed(2));
    if (value1 === value2) {
      return 0;
    } else {
      const disparity = parseFloat(
        (Math.abs(value1 - value2) / maxValue).toFixed(2)
      );
      return parseFloat((disparity * weightRate).toFixed(2)) * 100;
    }
  };

  return children
    .map((item: IStandardChild) => {
      const calParentAge = calculate(
        me.parentAge,
        item.parentAge,
        standard.parentAge.value,
        standard.parentAge.weight
      );
      const calParentGender = calculate(
        me.parentGender,
        item.parentGender,
        standard.parentGender.value,
        standard.parentGender.weight
      );
      const calIncomeRange = calculate(
        me.incomeRange,
        item.incomeRange,
        standard.incomeRange.value,
        standard.incomeRange.weight
      );
      const calChildAge = calculate(
        me.childAge,
        item.childAge,
        standard.childAge.value,
        standard.childAge.weight
      );
      const calChildGender = calculate(
        me.childGender,
        item.childGender,
        standard.childGender.value,
        standard.childGender.weight
      );

      return {
        ...item,
        parentAge: calParentAge,
        parentGender: calParentGender,
        incomeRange: calIncomeRange,
        childAge: calChildAge,
        childGender: calChildGender,
        sum:
          calParentAge +
          calParentGender +
          calIncomeRange +
          calChildAge +
          calChildGender,
      };
    })
    .sort((a, b) => b.sum - a.sum);
};
