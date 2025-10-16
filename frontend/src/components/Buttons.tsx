import { cn } from "../utils/cn";


type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void
};

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center bg-slate-950 text-white rounded-md border-1 border-slate-800 hover:bg-blue-600 cursor-pointer  ",
        className
      )} onClick={onClick}
    >
  { children }
    </button >
  );
};

export default Button;
