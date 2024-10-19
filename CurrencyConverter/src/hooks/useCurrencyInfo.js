import { useEffect, useState } from "react";

function useCurrencyInfo(selectedCurrency) {
    const [allCurrencies, setAllCurrencies] = useState({});
    const [currencyInfo, setCurrencyInfo] = useState({});

    // Step 1: Fetch all currencies data once when the component mounts
    useEffect(() => {
        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
            .then((res) => res.json())
            .then((res) => {
                setAllCurrencies(res);
                console.log("All Currencies Data:", res);
            })
            .catch((error) => console.error("Error fetching all currencies:", error));
    }, []);

    // Step 2: When selectedCurrency changes, fetch the corresponding currency data
    useEffect(() => {
        if (selectedCurrency !== "") {
            fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrency}.json`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(`Data for ${selectedCurrency}:`, res[selectedCurrency]);
                    setCurrencyInfo(res[selectedCurrency]);
                })
                .catch((error) => console.error("Error fetching selected currency data:", error));
        }
    }, [selectedCurrency]);

    // Return both `allCurrencies` and `currencyInfo`
    return { allCurrencies, currencyInfo };
}

export default useCurrencyInfo;
