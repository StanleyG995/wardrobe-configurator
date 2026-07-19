import { cn } from "@/helpers/cn";
import { ButtonProps } from "@/types/ButtonProps";
const Button = (buttonProps: ButtonProps) => {
  return (
    <button
      className={cn(STYLES.button, buttonProps.active && STYLES.buttonActive, buttonProps.disabled && STYLES.buttonDisabled)}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      {buttonProps.icon && buttonProps.iconPosition === "left" && buttonProps.icon}
      {buttonProps.children}
      {buttonProps.icon && buttonProps.iconPosition === "right" && buttonProps.icon}
    </button>
  );
};

const STYLES = {
  button: cn(
    "flex cursor-pointer flex-row items-center rounded-md border-1 border-gray-300 bg-gray-100 px-3 py-2 text-center text-sm font-medium text-black-800 shadow-md shadow-brand-700/10 ring-brand-500 transition-all duration-200 outline-none hover:bg-gray-200 hover:text-black-900 focus:ring-1",
  ),
  buttonActive: cn(""),
  buttonDisabled: cn("cursor-not-allowed border-gray-500 bg-gray-100 text-gray-400"),
};

export default Button;
