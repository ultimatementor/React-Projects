import { useState } from "react";
import InputBox from "./InputBox.jsx";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Custom Hook returns `allCurrencies` and `currencyInfo`
  const { allCurrencies, currencyInfo } = useCurrencyInfo(from);

  // Get the keys of `allCurrencies` to display in dropdown options
  const options = Object.keys(allCurrencies || {});

  // Swap function to swap `from` and `to` currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  // Convert the amount using `currencyInfo`
  const convert = () => {
    if (from === "" || to === "") {
      alert("Please select both From and To currencies before converting.");
      return;
    }
    setConvertedAmount(amount * (currencyInfo[to] || 0));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Currency Converter</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          convert();
        }}>
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(value) => setAmount(value)}
          />
          <button
            type="button"
            className="my-4 w-full bg-yellow-500 text-white rounded-lg p-2 transition-transform transform hover:scale-110 shadow-md"
            onClick={swap}
          >
            Swap
          </button>
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />
          <button
            type="submit" 
            className={`w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg ${from === "" || to === "" ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={from === "" || to === ""}
          >
            Convert
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
