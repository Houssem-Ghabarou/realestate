// LanguageCurrencySelector.js

import React from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
const LanguageCurrencySelector = ({
  setProgress,
  type,
  selectedLanguage,
  onChangeLanguage,
  selectedCurrency,
  onChangeCurrency,
}) => {
  const { i18n } = useTranslation();
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

  let selectedLang;
  if (i18n.language === "ar" || i18n.language.includes("ar")) {
    selectedLang = "SA";
  } else if (i18n.language === "en" || i18n.language.includes("en")) {
    selectedLang = "US";
  } else if (i18n.language === "fr" || i18n.language.includes("fr")) {
    selectedLang = "FR";
  }
  return (
    <div
      style={{ display: "flex", gap: type === "mobile" ? "0.5rem" : undefined }}
    >
      <ul className="select-language">
        <div className={type === "mobile" ? "nav-item-mobile" : "nav-item"}>
          <ReactFlagsSelect
            countries={["FR", "US", "SA"]}
            selected={selectedLang}
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
