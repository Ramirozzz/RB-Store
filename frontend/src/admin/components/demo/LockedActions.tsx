import type { ReactNode } from "react";
import { FcLock } from "react-icons/fc";

interface LockedActionsProps {
  children: ReactNode;
  className?: string;
  icon?: boolean;
}

const LockedActions: React.FC<LockedActionsProps> = ({
  children,
  className,
  icon = false,
}) => {
  return (
    <span
      title="Admin only"
      className={`flex items-center gap-2 cursor-not-allowed opacity-60 ${className}`}
      aria-label="Admin only"
    >
      {children}

      <FcLock
        size={icon ? 19 : 20}
        className="shrink-0 ml-auto text-red-800"
        aria-hidden="true"
      />
    </span>
  );
};

export default LockedActions;
