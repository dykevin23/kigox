interface AccordionProps {
  children: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Accordion = ({
  children,
  label = "",
  isActive = false,
  onClick,
}: AccordionProps) => {
  return (
    <div className="border rounded-md mb-2">
      <div
        onClick={onClick}
        className="w-full p-2 text-left bg-yellow-200 hover:bg-yellow-300 flex justify-between px-4 items-center"
      >
        <span className="font-semibold text-gray-700">{label}</span>
        {isActive ? <ActiveIcon /> : <NonActiveIcon />}
      </div>
      {isActive && <div className="p-1">{children}</div>}
    </div>
  );
};

const ActiveIcon = () => {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      ></path>
    </svg>
  );
};

const NonActiveIcon = () => {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      ></path>
    </svg>
  );
};

export default Accordion;
