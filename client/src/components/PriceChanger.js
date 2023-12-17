// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { CurrencyContext } from "../context/currencyContext";

// const API_KEY_PRICE = process.env.REACT_APP_API_KEY_PRICE;

// const DEFAULT_RATES = {
//   TND: 1, // Default conversion rate from TND to TND
//   EUR: 0.3, // Default conversion rate from TND to EUR
//   USD: 0.35, // Default conversion rate from TND to USD
// };

// const PriceChanger = ({ propertyPrice }) => {
//   const { currency } = useContext(CurrencyContext);
//   const [exchangeRate, setExchangeRate] = useState(DEFAULT_RATES[currency]);

//   useEffect(() => {
//     // Fetch exchange rate from the API
//     const fetchExchangeRate = async () => {
//       let appliedRate = DEFAULT_RATES[currency];

//       try {
//         const response = await axios.get(
//           `https://v6.exchangerate-api.com/v6/${API_KEY_PRICE}/latest/TND`
//         );
//         // Access the exchange rate for the selected currency
//         const rate = response?.data?.conversion_rates[currency];
//         if (rate) {
//           appliedRate = rate;
//         } else {
//           console.error(
//             `No rate returned for ${currency}, applied default rate.`
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rate:", error);
//       } finally {
//         setExchangeRate(appliedRate);
//       }
//     };

//     fetchExchangeRate();
//   }, [currency]);

//   const changedPrice = propertyPrice * exchangeRate;

//   return (
//     <span className="item-price">
//       {changedPrice.toFixed(0)} {currency}
//     </span>
//   );
// };

// export default React.memo(PriceChanger);

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { CurrencyContext } from "../context/currencyContext";

// const API_KEY_PRICE = process.env.REACT_API_KEY_PRICE;

// const PriceChanger = ({ propertyPrice }) => {
//   const { currency } = useContext(CurrencyContext);
//   const [exchangeRate, setExchangeRate] = useState(1);

//   useEffect(() => {
//     const fetchExchangeRate = async () => {
//       try {
//         const response = await axios.get(
//           `https://v6.exchangerate-api.com/v6/${API_KEY_PRICE}/latest/TND`
//         );
//         setExchangeRate(response?.data?.conversion_rates[currency]);
//       } catch (error) {
//         console.error("Error fetching exchange rate:", error);
//       }
//     };

//     fetchExchangeRate();
//   }, [currency]);

//   const changedPrice = propertyPrice * exchangeRate;

//   return (
//     <span className="item-price">
//       {changedPrice.toFixed(0)} {currency}
//     </span>
//   );
// };

// export default React.memo(PriceChanger);

import React, { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "../context/currencyContext";

const PriceChanger = ({ propertyPrice }) => {
  const { currency } = useContext(CurrencyContext);
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const defaultExchangeRates = {
      EUR: 0.3,
      USD: 0.32,
    };
    setExchangeRate(defaultExchangeRates[currency] || 1);
  }, [currency]); // Only re-run the effect if currency changes

  const changedPrice = propertyPrice * exchangeRate;

  return (
    <span className="item-price">
      {changedPrice.toFixed(0)} {currency}
    </span>
  );
};

export default React.memo(PriceChanger);
