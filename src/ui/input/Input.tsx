import clsx from "clsx";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  label?: string;
}

const InputWithOverlappingLabel = ({
  label,
  className,
  id,
  ...props
}: Props) => {
  return (
    <div className={clsx("relative", className)}>
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        {...props}
        id={id}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
  );
};

export { InputWithOverlappingLabel };
