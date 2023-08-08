import Link from "next/link";

interface FloatingButtonProps {
  href: string;
  children: React.ReactNode;
}
const FloatingButton = ({ href, children }: FloatingButtonProps) => {
  return (
    <Link
      href={href}
      className="fixed hover:bg-yellow-300 transition-colors cursor-pointer bottom-24 right-5 shadow-xl bg-yellow-400 rounded-full text-white border-0 aspect-square border-transparent w-14 flex items-center justify-center"
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
