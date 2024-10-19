import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Courses from "./components/Courses";
import Javascript from "./components/Javascript";
import Htmlfile from "./components/Htmlfile";
import Tailwind from "./components/Tailwind";
import Reactfile from "./components/Reactfile";
import ParamComp from "./components/ParamComp";
import Notfound from "./components/Notfound";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div>
          <Navbar />
          <About />
        </div>
      ),
    },
    {
      path: "/contact",
      element: (
        <div>
          <Navbar />
          <Contact />
        </div>
      ),
    },
    {
      path: "/:userId",
      element: (
        <div>
          <Navbar />
          <ParamComp />
        </div>
      ),
    },
    {
      path: "/courses",
      element: (
        <div>
          <Navbar />
          <Courses />
        </div>
      ),
      children: [
        {
          path: "javascript",
          element: <Javascript />,
        },
        {
          path: "react-js",
          element: <Reactfile />,
        },
        {
          path: "html",
          element: <Htmlfile />,
        },
        {
          path: "tailwind-css",
          element: <Tailwind />,
        }
      ]
    },
    {
      path: "*",
      element: (
        <div>
          <Navbar />
          <Notfound />
        </div>
      ),
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
