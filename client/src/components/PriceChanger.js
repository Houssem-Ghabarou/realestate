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
      EUR: 0.296684,
      USD: 0.319439,
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
