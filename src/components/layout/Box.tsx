interface BoxProps {
  children: React.ReactNode;
}

const Box = ({ children }: BoxProps) => {
  return <div className="m-2">{children}</div>;
};

export default Box;
