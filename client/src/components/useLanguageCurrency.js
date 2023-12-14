import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyContext } from "../context/currencyContext";
const useLanguageCurrency = () => {
  const { updateCurrency, currency } = useContext(CurrencyContext);
  const { i18n } = useTranslation();

  const [selected, setSelected] = useState(
    languageToCountryCode(i18n.language)
  );
  const [setselectedCurrency, setSetselectedCurrency] = useState(
    currencyToCountryCode(currency)
  );

  //language to country code
  function languageToCountryCode(language) {
    switch (language) {
      case "en":
        return "US";
      case "ar":
        return "SA";
      case "fr":
        return "FR";
      default:
        return "FR";
    }
  }

  //country to currency code
  const countryToCurrencyCode = (country) => {
    switch (country) {
      case "US":
        return "USD";
      case "TN":
        return "TND";
      case "FR":
        return "EUR";
      default:
        return "TND";
    }
  };

  //currency to country code
  function currencyToCountryCode(currency) {
    switch (currency) {
      case "USD":
        return "US";
      case "TND":
        return "TN";
      case "EUR":
        return "FR";
      default:
        return "FR";
    }
  }

  const onChangeLanguage = (code) => {
    let newLanguage;
    // Use `code` directly instead of `selected`
    if (code === "US") {
      newLanguage = "en";
    } else if (code === "SA") {
      newLanguage = "ar";
    } else if (code === "FR") {
      // Make sure to provide the option for "FR" if you want to support French;
      newLanguage = "fr";
    } else {
      newLanguage = "en"; // or some default value
    }

    i18n.changeLanguage(newLanguage);
    setSelected(code);

    document.body.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  const onChangeCurrency = (code) => {
    const newCurrency = countryToCurrencyCode(code);
    updateCurrency(newCurrency);
    setSetselectedCurrency(code);
  };

  useEffect(() => {
    const langElements = document.getElementsByClassName("lang");

    for (const element of langElements) {
      if (element.value === i18n.language) {
        if (element.value === "ar") {
          document.body.dir = "rtl";
        }
        element.setAttribute("selected", true);
      }
    }

    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return {
    selected,
    onChangeLanguage,
    setselectedCurrency,
    onChangeCurrency,
  };
};

export default useLanguageCurrency;
