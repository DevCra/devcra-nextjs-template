import { forwardRef, type ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button {...props} ref={ref}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
