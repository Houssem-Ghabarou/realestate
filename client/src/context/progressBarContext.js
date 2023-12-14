// import React, { createContext, useState, useMemo } from "react";

// export const ProgressBarContext = createContext([]);

// export const ProgressBarProvider = ({ children }) => {
//   const [progress, setProgress] = useState(0);

//   const contextValue = useMemo(() => {
//     const completeLoading = () => {
//       console.log("workedddd");
//       setProgress(50);
//       setTimeout(() => {
//         setProgress(90);
//       }, 400);
//     };
//     return {
//       completeLoading,
//       progress,
//       setProgress,
//     };
//   }, [progress, setProgress]);

//   return (
//     <ProgressBarContext.Provider value={contextValue}>
//       {children}
//     </ProgressBarContext.Provider>
//   );
// };
