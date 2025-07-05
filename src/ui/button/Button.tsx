import {
  forwardRef,
  useState,
  useCallback,
  type ComponentPropsWithRef,
  type ReactNode,
  type FocusEvent,
  type MouseEvent,
} from "react";

interface ButtonState {
  disabled: boolean;
  focus: boolean;
  hover: boolean;
  active: boolean;
}

interface ButtonProps
  extends Omit<ComponentPropsWithRef<"button">, "children"> {
  children: ((state: ButtonState) => ReactNode) | ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled = false,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref,
  ) => {
    const [focus, setFocus] = useState(false);
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLButtonElement>) => {
        setFocus(true);
        onFocus?.(event);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLButtonElement>) => {
        setFocus(false);
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleMouseEnter = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        setHover(true);
        onMouseEnter?.(event);
      },
      [onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        setHover(false);
        onMouseLeave?.(event);
      },
      [onMouseLeave],
    );

    const handleMouseDown = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        setActive(true);
        onMouseDown?.(event);
      },
      [onMouseDown],
    );

    const handleMouseUp = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        setActive(false);
        onMouseUp?.(event);
      },
      [onMouseUp],
    );

    const buttonState: ButtonState = {
      disabled,
      focus,
      hover,
      active,
    };

    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {typeof children === "function" ? children(buttonState) : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
