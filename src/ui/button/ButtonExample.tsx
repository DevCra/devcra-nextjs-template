"use client";

import clsx from "clsx";
import Button from "./Button";

export default function ButtonExample() {
  return (
    <>
      <Button disabled={false}>
        {({ disabled, focus, hover, active }) => (
          <span
            className={clsx(
              "rounded-md px-2 py-1",
              disabled ? "text-gray-500" : "text-black",
              focus ? "font-bold" : "font-normal",
              hover && !active && "bg-blue-500",
              active && "bg-red-500",
            )}
          >
            {disabled
              ? "비활성화됨"
              : hover
              ? "호버중"
              : focus
              ? "포커스됨"
              : "일반"}
          </span>
        )}
      </Button>
    </>
  );
}
