import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  isDeleting: boolean;
  onDelete: () => void;
  onCancel: () => void;
}
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  isDeleting,
  onDelete,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <HiOutlineExclamationTriangle size={24} />
          </div>
          <div>
            <h2 className="text-lg text-text">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm transition hover:bg-bg disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <HiOutlineTrash size={17} />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
