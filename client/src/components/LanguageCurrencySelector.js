// LanguageCurrencySelector.js

import React from "react";
import ReactFlagsSelect from "react-flags-select";

const LanguageCurrencySelector = ({
  setProgress,
  type,
  selectedLanguage,
  onChangeLanguage,
  selectedCurrency,
  onChangeCurrency,
}) => {
  const onChangeLanguageEffect = (selectedLanguage) => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 400);
    onChangeLanguage(selectedLanguage);
  };

  const onChangeCurrencyEffect = (selectedCurrency) => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 400);
    onChangeCurrency(selectedCurrency);
  };
  return (
    <div
      style={{ display: "flex", gap: type === "mobile" ? "0.5rem" : undefined }}
    >
      <ul className="select-language">
        <div className={type === "mobile" ? "nav-item-mobile" : "nav-item"}>
          <ReactFlagsSelect
            countries={["FR", "US", "SA"]}
            selected={selectedLanguage}
            className={type === "mobile" ? "menu-flags-mobile" : "menu-flags"}
            onSelect={(selectedLanguage) =>
              onChangeLanguageEffect(selectedLanguage)
            }
            customLabels={{
              US: "English",
              FR: "Français",
              SA: "العربية",
            }}
          />
        </div>
      </ul>
      <ul className="select-currency">
        <div className={type === "mobile" ? "nav-item-mobile" : "nav-item"}>
          <ReactFlagsSelect
            countries={["TN", "FR", "US"]}
            customLabels={{
              US: "USD",
              FR: "EUR",
              TN: "TND",
            }}
            selected={selectedCurrency}
            className={type === "mobile" ? "menu-flags-mobile" : "menu-flags"}
            onSelect={(selectedCurrency) =>
              onChangeCurrencyEffect(selectedCurrency)
            }
          />
        </div>
      </ul>
    </div>
  );
};

export default LanguageCurrencySelector;
