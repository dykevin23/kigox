interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="flex flex-col bg-white p-3 gap-2 rounded-md">
      {children}
    </div>
  );
};

export default Card;
