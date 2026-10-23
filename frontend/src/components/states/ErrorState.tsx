import { TbFaceIdError } from "react-icons/tb";

interface ErrorStateProps {
  message?: string;
  className?: string;
}
const ErrorState: React.FC<ErrorStateProps> = ({ message, className }) => {
  return (
    <div
      className={`flex min-h-[60vh] flex-col items-center justify-center px-5 text-center ${className}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <TbFaceIdError size={32} className="text-red-600" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-text">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{message}</p>
    </div>
  );
};

export default ErrorState;
