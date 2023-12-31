import React, { createContext, useState, useMemo, useEffect } from "react";

export const CurrencyContext = createContext([]);

export const CurrencyProvider = ({ children }) => {
  // Initialize the currency state with the value from localStorage or "TND" as a default
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "TND"
  );

  // Memoize the context value
  const contextValue = useMemo(() => {
    // Update the currency state and localStorage
    const updateCurrency = (newCurrency) => {
      setCurrency(newCurrency);
      localStorage.setItem("currency", newCurrency);
    };

    return {
      currency,
      updateCurrency,
    };
  }, [currency]);

  // useEffect to initialize the state from localStorage on component mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
  }, []);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
