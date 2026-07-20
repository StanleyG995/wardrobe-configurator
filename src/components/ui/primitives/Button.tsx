import { cn } from "@/helpers/cn";
import { ButtonProps } from "@/types/ButtonProps";
const Button = (button: ButtonProps) => {
  return (
    <button
      className={cn(STYLES.button, button.disabled && STYLES.buttonDisabled, button.fullWidth ? "w-full" : "w-auto", button.primary && STYLES.buttonPrimary)}
      onClick={button.onClick}
      disabled={button.disabled}
    >
      {button.toggleable && <div className={cn(STYLES.toggleIndicator, button.active && STYLES.toggleIndicatorActive)}></div>}
      <div className={STYLES.buttonWrapper}>
        {button.icon && button.iconPosition === "left" && button.icon}
        {button.children}
        {button.icon && button.iconPosition === "right" && button.icon}
      </div>
    </button>
  );
};

const STYLES = {
  button: cn(
    "font-regular flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md border-1 border-gray-300 bg-gray-50 px-2 py-2 md:px-3 md:py-2 text-center text-sm text-black-800 shadow-md shadow-brand-700/10 ring-brand-500 transition-all duration-200 outline-none hover:bg-gray-50 hover:text-black-700 focus:ring-1",
  ),
  buttonWrapper: cn("flex row gap-1 items-center"),
  buttonActive: cn("border-brand-500 bg-gray-200 text-brand-700"),
  buttonPrimary: cn('bg-brand-500 text-white hover:bg-brand-400 hover:text-white'),
  buttonDisabled: cn("cursor-not-allowed border-gray-500 bg-gray-100 text-gray-400"),
  toggleIndicator: cn("md:mr-2 w-1 h-1  md:h-2 md:w-2 rounded-full bg-gray-300 md:block "),
  toggleIndicatorActive: cn("bg-brand-500 shadow-md shadow-brand-300/50"),
  
};

export default Button;
