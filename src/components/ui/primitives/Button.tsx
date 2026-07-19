import { cn } from "@/helpers/cn";
import { ButtonProps } from "@/types/ButtonProps";
const Button = ({ buttonProps }: { buttonProps: ButtonProps }) => {
  return (
    <button className={STYLES.button} {...buttonProps}>
      {buttonProps.children}
    </button>
  );
};

const STYLES = {
  button: cn(
    "bg-white-700 w-full cursor-pointer border-1 border-black-400 p-2 text-black-900 transition-all outline-none hover:bg-gray-200 hover:text-black-800",
  ),
};

export default Button;
