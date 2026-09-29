import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface loadingOverlayProps {
  isVisible: boolean;
}

const LoadingOverlay: React.FC<loadingOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <LoadingSpinner size={60} color="#000000" />
    </div>
  );
};

export default LoadingOverlay;
