// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   // State to store the fetched products
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // Self-invoking async function to fetch products with a delay
//     (async () => {
//       setError(false); // Reset error before making the request
//       setLoading(true); // Show loading indicator

//       const options = {
//         method: "GET",
//         url: `https://api.freeapi.app/api/v1/public/randomproducts`,
//       };

//       // Wrapping setTimeout in a Promise to use await correctly
//       await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay

//       try {
//         const { data } = await axios.request(options); // Fetch products from the API
//         setProducts(data.data.data); // Set fetched products in state
//         setFilteredProducts(data.data.data); // Initially show all products
//         setLoading(false);
//       } catch (error) {
//         setError(true); // Update error state to show error message
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Filter products based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = products.filter((product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products); // Show all products if search term is empty
//     }
//   }, [searchTerm, products]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4 text-center text-black">
//         Total Products: {filteredProducts.length}
//       </h1>
//       <div className="flex justify-center mb-6">
//         <input
//           className="border-2 border-gray-300 rounded-lg p-2 w-1/2 text-xl"
//           type="search"
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       {/* Display error message if any */}
//       {error && (
//         <h1 className="text-red-500 text-center text-2xl">
//           Something went wrong
//         </h1>
//       )}
//       {loading && (
//         <h1 className="text-blue-500 text-center text-2xl">Loading...</h1>
//       )}
//       {/* If no products match the search term */}
//       {filteredProducts.length === 0 && !loading && (
//         <h2 className="text-center text-xl text-gray-700">
//           No products found matching "{searchTerm}".
//         </h2>
//       )}
//       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {filteredProducts.map((product) => (
//           <li key={product.id} className="bg-white rounded-lg shadow-md p-4">
//             <h2 className="text-lg font-semibold text-black">
//               {product.title}
//             </h2>
//             <p className="text-gray-600">{product.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// ------------------------------------

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";

// Utility function for debouncing API requests
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

// Utility function for throttling API requests
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(null, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

function App() {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(false); // State for error handling
  const [loading, setLoading] = useState(false); // State for showing loading state
  const [searchTerm, setSearchTerm] = useState(""); // State to track user input

  // useRef to persist the AbortController instance between renders
  const controllerRef = useState(null);

  // Function to fetch products from the API with proper request cancellation
  const fetchProducts = async (query) => {
    // Cancel any ongoing request when a new one starts
    if (controllerRef.current) {
      controllerRef.current.abort(); // Abort the previous request
    }

    // Create a new AbortController for the new request
    controllerRef.current = new AbortController();

    setError(false); // Reset the error state before fetching
    setLoading(true); // Show loading state

    const options = {
      method: "GET",
      url: `https://api.freeapi.app/api/v1/public/randomproducts?search=${query}`,
      signal: controllerRef.current.signal, // Attach the signal to the request
    };

    try {
      const { data } = await axios.request(options); // Perform the API request
      setProducts(data.data.data); // Set the fetched products in state
      setLoading(false); // Hide loading state
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request was cancelled", error.message); // Handle request cancellation
        return; // Exit early when the request was cancelled
      }
      setError(true); // Set error state if request fails
      setLoading(false); // Hide loading state
    }
  };

  // Debounced function to fetch products after user stops typing
  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), []);

  // Throttled function to limit API requests
  const throttledFetchProducts = useCallback(throttle(fetchProducts, 1000), []);

  useEffect(() => {
    // Only fetch products if there's a search term
    if (searchTerm) {
      debouncedFetchProducts(searchTerm); // Debounced request
      throttledFetchProducts(searchTerm); // Throttled request
    }

    // Cleanup function to abort the current request when the component unmounts or before a new request
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort(); // Abort the ongoing request when unmounting or cleanup
      }
    };
  }, [searchTerm, debouncedFetchProducts, throttledFetchProducts]);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white w-full font-mono">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Search Products
      </h1>
      <div className="flex justify-center mb-8">
        <input
          className="border-2 border-gray-300 rounded-lg p-4 w-2/3 lg:w-1/3 text-xl text-black outline-none"
          type="search"
          placeholder="Type to search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
        />
      </div>
      {/* Show error message if an error occurs */}
      {error && (
        <h1 className="text-red-400 text-center text-2xl">
          Something went wrong. Please try again!
        </h1>
      )}
      {/* Show loading message while products are being fetched */}
      {loading && (
        <h1 className="text-yellow-400 text-center text-2xl">
          Loading products...
        </h1>
      )}
      {/* Show message when no products are found for the search term */}
      {!loading && !error && products.length === 0 && searchTerm && (
        <h1 className="text-center text-xl text-gray-200">
          No products found for "{searchTerm}".
        </h1>
      )}
      {/* Display fetched products in a grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white rounded-lg shadow-md p-6 text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// ------------------------------------------

// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import "./App.css";

// // Utility function for debouncing API requests
// function debounce(func, delay) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(null, args);
//     }, delay);
//   };
// }

// // Utility function for throttling API requests
// function throttle(func, limit) {
//   let lastFunc;
//   let lastRan;
//   return (...args) => {
//     if (!lastRan) {
//       func.apply(null, args);
//       lastRan = Date.now();
//     } else {
//       clearTimeout(lastFunc);
//       lastFunc = setTimeout(() => {
//         if (Date.now() - lastRan >= limit) {
//           func.apply(null, args);
//           lastRan = Date.now();
//         }
//       }, limit - (Date.now() - lastRan));
//     }
//   };
// }

// function App() {
//   const [products, setProducts] = useState([]); // State to store fetched products
//   const [error, setError] = useState(false); // State for error handling
//   const [loading, setLoading] = useState(false); // State for showing loading state
//   const [searchTerm, setSearchTerm] = useState(""); // State to track user input

//   // useRef to persist the AbortController instance between renders
//   const controllerRef = useState(null);

//   // Function to fetch products from the API with proper request cancellation
//   const fetchProducts = async (query) => {
//     // Cancel any ongoing request when a new one starts
//     if (controllerRef.current) {
//       controllerRef.current.abort(); // Abort the previous request
//     }

//     // Create a new AbortController for the new request
//     controllerRef.current = new AbortController();

//     setError(false); // Reset the error state before fetching
//     setLoading(true); // Show loading state

//     const options = {
//       method: "GET",
//       url: `https://api.freeapi.app/api/v1/public/randomproducts?search=${query}`,
//       signal: controllerRef.current.signal, // Attach the signal to the request
//     };

//     try {
//       const { data } = await axios.request(options); // Perform the API request
//       setProducts(data.data.data); // Set the fetched products in state
//       setLoading(false); // Hide loading state
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log("Request was cancelled", error.message); // Handle request cancellation
//         return; // Exit early when the request was cancelled
//       }
//       setError(true); // Set error state if request fails
//       setLoading(false); // Hide loading state
//     }
//   };

//   // Debounced function to fetch products after user stops typing
//   const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), []);

//   // Throttled function to limit API requests
//   const throttledFetchProducts = useCallback(throttle(fetchProducts, 1000), []);

//   useEffect(() => {
//     // Only fetch products if there's a search term
//     if (searchTerm) {
//       debouncedFetchProducts(searchTerm); // Debounced request
//       throttledFetchProducts(searchTerm); // Throttled request
//     }

//     // Cleanup function to abort the current request when the component unmounts or before a new request
//     return () => {
//       if (controllerRef.current) {
//         controllerRef.current.abort(); // Abort the ongoing request when unmounting or cleanup
//       }
//     };
//   }, [searchTerm, debouncedFetchProducts, throttledFetchProducts]);

//   // Filter products locally for exact matches based on the title
//   const filteredProducts = products.filter(
//     (product) => product.title.toLowerCase() === searchTerm.toLowerCase() // Exact match on product title
//   );

//   return (
//     <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white w-full font-mono">
//       <h1 className="text-4xl font-extrabold text-center mb-8">
//         Search Products
//       </h1>
//       <div className="flex justify-center mb-8">
//         <input
//           className="border-2 border-gray-300 rounded-lg p-4 w-2/3 lg:w-1/3 text-xl text-black outline-none"
//           type="search"
//           placeholder="Type to search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
//         />
//       </div>
//       {/* Show error message if an error occurs */}
//       {error && (
//         <h1 className="text-red-400 text-center text-2xl">
//           Something went wrong. Please try again!
//         </h1>
//       )}
//       {/* Show loading message while products are being fetched */}
//       {loading && (
//         <h1 className="text-yellow-400 text-center text-2xl">
//           Loading products...
//         </h1>
//       )}
//       {/* Show message when no products are found for the search term */}
//       {!loading && !error && filteredProducts.length === 0 && searchTerm && (
//         <h1 className="text-center text-xl text-gray-200">
//           No products found for "{searchTerm}".
//         </h1>
//       )}
//       {/* Display fetched products in a grid */}
//       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <li
//             key={product.id}
//             className="bg-white rounded-lg shadow-md p-6 text-gray-800"
//           >
//             <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
//             <p className="text-gray-600">{product.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
