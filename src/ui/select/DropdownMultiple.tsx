import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { DropdownOption } from "./DropdownSingle";
import { TrashIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { getSortedOptions } from "@/utils/sort";

export interface DropdownMultipleProps {
  options: DropdownOption[];
  selected?: DropdownOption[];
  onSelect?: (options: DropdownOption[]) => void;
  label?: string;
  disabled?: boolean;
  menuLocation?: "top" | "bottom";
  labelClassName?: string;
  containerClassName?: string;
  scrollClassName?: string;
  placeholderClassName?: string;
  hasSearch?: boolean;
  isResetButtonShown?: boolean;
  isHideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
}

export const DropdownMultiple = ({
  options,
  selected = [],
  onSelect,
  label,
  disabled,
  labelClassName,
  containerClassName,
  scrollClassName,
  placeholderClassName,
  hasSearch = true,
  menuLocation = "bottom",
  isResetButtonShown = false,
  isHideLabel = false,
  placeholder,
  required = false,
}: DropdownMultipleProps) => {
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSelected, setTempSelected] = useState<DropdownOption[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasMenuInBottom = menuLocation === "bottom";

  const filteredOptions = searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  const handleSelect = (option: DropdownOption) => {
    const newSelected = tempSelected.some((item) => item.value === option.value)
      ? tempSelected.filter((item) => item.value !== option.value)
      : [...tempSelected, option];

    const sortedNewSelected = getSortedOptions(newSelected);

    setTempSelected(sortedNewSelected);

    if (!isOpen) {
      onSelect?.(sortedNewSelected);
    }
  };

  const handleDeleteOption = () => {
    setTempSelected([]);
    onSelect?.([]);
  };

  const handleSelectAll = () => {
    if (tempSelected.length === options.length) {
      setTempSelected([]);
    } else {
      setTempSelected(options);
    }
  };

  const isAllSelected = () => {
    return tempSelected.length === options.length;
  };

  const renderSelectedValue = () => {
    const currentSelected = isOpen ? tempSelected : selected;

    if (currentSelected.length === 0) {
      return (
        <span
          className={clsx(
            placeholderClassName ? placeholderClassName : "text-grayscale_4_aa",
          )}
        >
          {placeholder}
        </span>
      );
    }

    return (
      <div
        className={clsx("flex flex-wrap gap-1 overflow-auto", scrollClassName)}
      >
        {currentSelected.map((item, index) => {
          const option = options.find((opt) => opt.value === item.value);

          if (!option) {
            return null;
          }

          return (
            <div
              key={`${item}--${index}`}
              className="flex items-center justify-between rounded-md bg-sky-500 px-2 py-1 text-sm text-white"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="text-start">{option.label}</span>
              <i
                onClick={() => {
                  handleSelect(item);
                }}
                className={clsx("ml-1 not-italic", {
                  "cursor-pointer hover:text-red-200": !disabled,
                  "cursor-not-allowed": disabled,
                })}
              >
                ×
              </i>
            </div>
          );
        })}
      </div>
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
      onSelect?.(tempSelected);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selected ?? []);
    }
  }, [isOpen, selected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement) &&
        isOpen
      ) {
        setOpen(false);
        setSearchQuery("");
        onSelect?.(tempSelected);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tempSelected, onSelect, isOpen]);

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
            setOpen((prev) => !prev);
            setSearchQuery("");
            if (isOpen) {
              onSelect?.(tempSelected);
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
                <TrashIcon className="text-gray-400 h-4 w-4" />
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

            <div
              className="flex cursor-pointer items-center gap-2 break-all border-b border-grayscale_2_dd px-4 py-2"
              onClick={handleSelectAll}
            >
              <input
                type="checkbox"
                checked={isAllSelected()}
                onChange={() => {}}
                className="h-4 w-4"
              />
              전체 선택
            </div>

            {filteredOptions.map((option, idx) => (
              <div
                key={`${option.value}--${idx}`}
                className={clsx(
                  "flex cursor-pointer items-center gap-2 break-all px-4 py-2 hover:bg-sky-500 hover:text-white",
                  tempSelected.some((item) => item.value === option.value) &&
                    "font-bold",
                )}
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  checked={tempSelected.some(
                    (item) => item.value === option.value,
                  )}
                  onChange={() => {}}
                  className="h-4 w-4"
                />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
