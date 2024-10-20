import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Paste from "./components/Paste.jsx";
import ViewPastes from "./components/ViewPastes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Contact from "./../../ReactRounting/src/components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/view-pastes/:id",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <ViewPastes />
      </div>
    ),
  },
  {
    path: "/contact",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Contact />
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <div className="min-h-screen w-screen overflow-hidden">
        <App />
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </div>
    </Provider>
  </StrictMode>
);
