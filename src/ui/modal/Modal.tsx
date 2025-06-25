import { type MouseEvent, type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
const Modal = ({
  isOpen,
  hide,
  children,
  hideOnClickOutside = false,
  hideOnEscKeyClickOutside = false,
}: {
  isOpen: boolean;
  hide: () => void;
  children: ReactNode;
  hideOnClickOutside?: boolean;
  hideOnEscKeyClickOutside?: boolean;
}) => {
  const [container, setContainer] = useState<Element | null>(null);

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const portalContainer = document.querySelector("#modalRoot");
    setContainer(portalContainer);
  }, []);

  useEffect(() => {
    if (!hideOnEscKeyClickOutside || !isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hideOnEscKeyClickOutside, isOpen, hide]);

  if (!isOpen || !container) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/60"
      onClick={hideOnClickOutside ? hide : undefined}
    >
      <div
        className="flex flex-col rounded-lg border border-solid border-grayscale_2_dd bg-white"
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>,
    container,
  );
};

const ModalHeader = ({
  title,
  hide,
  children,
  titleClassName,
}: {
  title?: string;
  hide?: () => void;
  children?: ReactNode;
  titleClassName?: string;
}) => {
  return (
    <header className="flex items-center justify-between p-4">
      <p className={titleClassName}>{title}</p>
      {children}
      <button type="button" onClick={hide}>
        <XMarkIcon className="text-black h-4 w-4" />
      </button>
    </header>
  );
};

const ModalContent = ({ children }: { children?: ReactNode }) => {
  return <main className="flex-1">{children}</main>;
};

const ModalFooter = ({ children }: { children?: ReactNode }) => {
  return <footer>{children}</footer>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

/* Compound Component */

export default Modal;
