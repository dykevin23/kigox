import Button from "../Button";

interface FormProps {
  label?: string;
  onSubmit?: any;
  children: React.ReactNode;
}

const Form = (props: FormProps) => {
  const { label = "", onSubmit, children } = props;
  return (
    <>
      <form className="flex flex-col pt-3 pb-20 mx-3 gap-2">{children}</form>
      <div
        className="fixed bottom-0 w-full flex items-center justify-center h-14 bg-yellow-300"
        onClick={onSubmit}
      >
        <span className="text-lg font-medium">{label}</span>
      </div>
    </>
  );
};

export default Form;
