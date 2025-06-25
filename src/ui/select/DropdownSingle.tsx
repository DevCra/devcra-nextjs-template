import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { TrashIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownSingleProps {
  options: DropdownOption[];
  selected?: DropdownOption;
  onSelect?: (option: DropdownOption) => void;
  label?: string;
  disabled?: boolean;
  menuLocation?: "top" | "bottom";
  labelClassName?: string;
  containerClassName?: string;
  hasSearch?: boolean;
  isResetButtonShown?: boolean;
  isHideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
}

export const DropdownSingle = ({
  options,
  selected,
  onSelect,
  label,
  disabled,
  labelClassName,
  containerClassName,
  hasSearch = true,
  menuLocation = "bottom",
  isResetButtonShown = false,
  isHideLabel = false,
  placeholder,
  required = false,
}: DropdownSingleProps) => {
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasMenuInBottom = menuLocation === "bottom";

  const filteredOptions = searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  const handleSelect = (option: DropdownOption) => {
    onSelect?.(option);
    setOpen(false);
    setSearchQuery("");
  };

  const handleDeleteOption = () => {
    onSelect?.({ label: "", value: "" });
  };

  const renderSelectedValue = () => {
    return (
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {selected ? (
          selected.label || (
            <span className="text-grayscale_4_aa">{placeholder}</span>
          )
        ) : (
          <span className="text-grayscale_4_aa">{placeholder}</span>
        )}
      </span>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement)
      ) {
        setOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-4">
      {!isHideLabel && label && (
        <span className={clsx("text-grayscale_6_75", labelClassName)}>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      <div
        ref={dropdownRef}
        className={clsx("relative", containerClassName)}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className={clsx(
            "flex h-full w-full items-center justify-between gap-2 rounded-lg border border-grayscale_2_dd px-4 py-2 outline-none",
            {
              "cursor-pointer bg-white": !disabled,
              "cursor-not-allowed bg-grayscale_1_ee": disabled,
            },
          )}
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
              setSearchQuery("");
            }
          }}
        >
          {renderSelectedValue()}
          <div className="flex items-center gap-2">
            {isResetButtonShown && !disabled && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteOption();
                }}
                className="text-gray-400"
              >
                <TrashIcon className="h-4 w-4" />
              </span>
            )}
            {!disabled && (
              <ChevronUpIcon
                className={clsx("transition-transform duration-300 h-4 w-4", {
                  "rotate-0": isOpen,
                  "rotate-180": !isOpen,
                })}
              />
            )}
          </div>
        </button>

        {isOpen && options.length > 0 && (
          <div
            className={clsx(
              "absolute z-10 max-h-[200px] w-full overflow-y-auto rounded-lg border border-grayscale_2_dd bg-white shadow-lg outline-none",
              hasMenuInBottom ? "mt-1" : "bottom-[34px]",
            )}
          >
            {hasSearch && (
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Enter ${label}`}
                className="sticky top-0 w-full rounded-lg bg-white px-4 py-2 focus:outline-sky-500"
              />
            )}

            {filteredOptions.map((option, idx) => (
              <div
                key={`${option.value}--${idx}`}
                className={clsx(
                  "cursor-pointer break-all px-4 py-2 hover:bg-sky-500 hover:text-white",
                  selected?.label === option.label && "font-bold",
                )}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
