import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const GlobalSpinner = () => {
  const isFetching = useIsFetching();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isFetching > 0) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [isFetching]);

  if (!showLoader) {
    return null;
  }
  //   console.log("isFetching:", isFetching);

  return (
    <div className="fixed left-0 top-0 z-[9999] h-[2.5px] w-full overflow-hidden">
      <div className="loader-line" />
    </div>
  );
};

export default GlobalSpinner;
