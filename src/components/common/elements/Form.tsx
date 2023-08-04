interface FormProps {
  onSubmit?: any;
  children: React.ReactNode;
}

const Form = (props: FormProps) => {
  const { onSubmit, children } = props;
  return (
    <form onSubmit={onSubmit} className="flex flex-col pt-3 m-3 gap-2">
      {children}
    </form>
  );
};

export default Form;
