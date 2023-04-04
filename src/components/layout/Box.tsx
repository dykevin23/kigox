interface BoxProps {
  children: React.ReactNode;
}

const Box = ({ children }: BoxProps) => {
  return <div className="mx-2">{children}</div>;
};

export default Box;
