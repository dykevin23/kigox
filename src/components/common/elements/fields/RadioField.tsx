const RadioField = ({ register, label, reverse = false, ...rest }: any) => {
  return (
    <input
      type="radio"
      {...register}
      className="relative h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 
      before:absolute before:h-4 before:w-4 before:opacity-0 before:rounded-full
      after:absolute after:h-4 after:w-4 after:rounded-full
      checked:border-yellow-300 checked:before:opacity-[0.16]
      checked:after:left-1/2 checked:after:top-1/2 checked:after:bg-yellow-300
      checked:after:[transform:translate(-50%,-50%)] 
      checked:after:h-[0.625rem] 
      checked:after:w-[0.625rem] 
      "
      {...rest}
    />
  );
};

export default RadioField;
