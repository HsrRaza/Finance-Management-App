import { cn } from "../utils/cn";


type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center bg-slate-950 text-white rounded-md border-1 border-slate-800 hover:bg-blue-600 cursor-pointer ",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
