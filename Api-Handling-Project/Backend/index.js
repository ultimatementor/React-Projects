import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
  const products = [];
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// useEffect to fetch the products when the component mounts
// useEffect(() => {
//   // Immediately-invoked function expression (IIFE) to fetch data
//   (async () => {
//     try {
//       // Fetch data from the API
//       const response = await fetch(
//         "https://api.freeapi.app/api/v1/public/randomproducts"
//       );

//       // Parse the JSON data from the response
//       const result = await response.json();
//       console.log(result.data.data);
//       console.log(result.data.data[0].description);

//       // Extract the products array from the nested "data" object
//       setProducts(result.data.data); // This sets the products to the correct array
//     } catch (error) {
//       // Log any error in case the API call fails
//       console.error("Error fetching products:", error);
//     }
//   })(); // IIFE ends here, it runs immediately
// }, []); // Empty dependency array ensures this runs once when the component mounts
