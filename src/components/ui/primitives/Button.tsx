import { cn } from "@/helpers/cn";
import { ButtonProps } from "@/types/ButtonProps";
const Button = (button: ButtonProps) => {
  return (
    <button
      className={cn(STYLES.button, button.active && STYLES.buttonActive, button.disabled && STYLES.buttonDisabled, button.fullWidth ? "w-full" : "w-auto")}
      onClick={button.onClick}
      disabled={button.disabled}
    >
      {button.icon && button.iconPosition === "left" && button.icon}
      {button.children}
      {button.icon && button.iconPosition === "right" && button.icon}
    </button>
  );
};

const STYLES = {
  button: cn(
    "flex cursor-pointer flex-row items-center rounded-md border-1 border-gray-300 bg-gray-50 px-3 py-2 text-center text-sm font-regular text-black-800 shadow-md shadow-brand-700/10 ring-brand-500 transition-all duration-200 outline-none hover:bg-gray-50 hover:text-black-700 focus:ring-1",
  ),
  buttonActive: cn("bg-gray-200 text-brand-700 border-brand-500"),
  buttonDisabled: cn("cursor-not-allowed border-gray-500 bg-gray-100 text-gray-400"),
};

export default Button;
