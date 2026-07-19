import { cn } from "@/helpers/cn";
import { ButtonProps } from "@/types/ButtonProps";
const Button = (buttonProps : ButtonProps ) => {
  return (
    <button className={STYLES.button} onClick={buttonProps.onClick}>
      {buttonProps.icon && buttonProps.iconPosition === "left" && buttonProps.icon}
      {buttonProps.children}
      {buttonProps.icon && buttonProps.iconPosition === "right" && buttonProps.icon}
    </button>
  );
};

const STYLES = {
  button: cn("bg-blur-2 flex cursor-pointer items-center justify-start gap-2 border-1 border-black-800 px-3 py-2 text-[12px] transition-colors duration-200"),
  buttonActive: cn("bg-black-800 text-gray-100"),
  buttonInactive: cn("bg-gray-100 text-black-800"),
};

export default Button;
