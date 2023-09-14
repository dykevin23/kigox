interface ListProps {
  children: React.ReactNode;
}
const List = ({ children }: ListProps) => {
  return (
    <ul className="gap-1 mb-3 rounded-md bg-slate-100 py-1">{children}</ul>
  );
};

interface ListItemProps {
  children: React.ReactNode;
  justifyContent?: "start" | "end" | "center" | "between";
  onClick?: () => void;
}
const ListItem = (props: ListItemProps) => {
  const { children, justifyContent = "start", onClick } = props;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <li
      className={`flex items-center justify-${justifyContent} px-3 py-2`}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

List.Item = ListItem;

const ItemLabel = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-gray-500">{children}</span>;
};
List.ItemLabel = ItemLabel;

const ItemValue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-slate-700">{children}</span>;
};
List.ItemValue = ItemValue;

export default List;
