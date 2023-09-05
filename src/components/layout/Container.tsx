interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return <div className="flex flex-col">{children}</div>;
};

export default Container;
