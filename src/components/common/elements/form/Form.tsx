import Button from "../Button";

interface FormProps {
  label?: string;
  onSubmit?: any;
  children: React.ReactNode;
}

const Form = (props: FormProps) => {
  const { label = "", onSubmit, children } = props;
  return (
    <form onSubmit={onSubmit} className="flex flex-col pt-3 m-3 gap-2">
      {children}
      {label && <Button label={label} isSubmit />}
    </form>
  );
};

export default Form;
