import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Notfound from "./components/Notfound/Notfound";
import CounterContextProvider from "./Context/CounterContext";
import Profile from "./components/Profile/Profile";
import AuthContextProvider from "./Context/AuthContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
      { path: "profile", element: <Profile /> }
    ],
  },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <CounterContextProvider>
        <RouterProvider router={router} />
      </CounterContextProvider>
    </AuthContextProvider>
  );
}