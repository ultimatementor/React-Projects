import React, { useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "",
    amountDisable = false,
}) {
    const amountInputId = useId();

    return (
        <div className="mb-4">
            <label htmlFor={amountInputId} className="block text-gray-700 mb-1 font-medium">
                {label}
            </label>
            <input
                id={amountInputId}
                className="outline-none w-full p-2 border border-gray-300 rounded-md shadow-sm"
                style={{ backgroundColor: 'rgba(229, 231, 235, 0.32)' }}
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
                disabled={amountDisable}
            />
            <select
                className="mt-2 w-full border border-gray-300 rounded-md p-2 shadow-sm bg-white cursor-pointer"
                value={selectCurrency}
                onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            >
                <option value="" disabled>Select Currency</option>
                {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputBox;
