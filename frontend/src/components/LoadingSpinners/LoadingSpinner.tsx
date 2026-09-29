import { ClipLoader } from "react-spinners";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size, color }) => {
  return (
    <>
      <ClipLoader size={size} color={color} />
    </>
  );
};

export default LoadingSpinner;
