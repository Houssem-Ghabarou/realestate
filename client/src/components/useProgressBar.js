import { useLayoutEffect } from "react";

const useProgressBar = (setProgress) => {
  useLayoutEffect(() => {
    setProgress(40);
    // setProgress(60);
    setTimeout(() => {
      setProgress(100);
    }, 400);
    // eslint-disable-next-line
  }, []);
};

export default useProgressBar;
