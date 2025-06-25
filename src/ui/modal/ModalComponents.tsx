import { type FormEvent, type ReactNode } from "react";
import Modal from "./Modal";

export const AlertModal = ({
  isOpen,
  hide,
  text,
}: {
  isOpen: boolean;
  hide: () => void;
  text: string;
}) => {
  return (
    <Modal isOpen={isOpen} hide={hide}>
      <Modal.Content>
        <p>{text}</p>
      </Modal.Content>
      <Modal.Footer>
        <button type="button" onClick={hide}>
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export const ConfirmModal = ({
  isOpen,
  hide,
  children,
  confirmed,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  hide: () => void;
  children: ReactNode;
  confirmed: boolean | null;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} hide={hide} hideOnClickOutside>
      <Modal.Header
        title={confirmed ? "확인된 컨펌" : "확인안된 컨펌"}
        hide={hide}
      />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <button type="button" onClick={onConfirm}>
          확인
        </button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export const FormModal = ({
  id,
  isOpen,
  hide,
  children,
  onSubmit,
  onCancel,
}: {
  id: string;
  isOpen: boolean;
  hide: () => void;
  children: ReactNode;
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
}) => {
  const formId = `form_${id}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    onSubmit?.(data);
    hide();
  };

  const handleCancel = () => {
    onCancel?.();
    hide();
  };

  return (
    <Modal
      isOpen={isOpen}
      hide={hide}
      hideOnClickOutside={true}
      hideOnEscKeyClickOutside={true}
    >
      <Modal.Header hide={hide} />
      <Modal.Content>
        <form id={formId} onSubmit={handleSubmit}>
          {children}
        </form>
      </Modal.Content>
      <Modal.Footer>
        <button type="submit" form={formId}>
          확인
        </button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};
