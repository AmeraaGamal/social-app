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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import ProtectedAuthRoute from "./components/ProtectedRoute/ProtectedِAuthRoute"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetails from "./components/PostDetails/PostDetails";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRoute><Home/></ProtectedRoute> },
      { path: "home", element:<ProtectedRoute><Home/></ProtectedRoute> },
      { path: "postdetails/:id", element:<ProtectedRoute><PostDetails/></ProtectedRoute> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element:<ProtectedAuthRoute><Login/></ProtectedAuthRoute> },
      { path: "register", element: < ProtectedAuthRoute><Register/></ProtectedAuthRoute> },
      { path: "*", element: <Notfound /> },
      { path: "profile", element: <ProtectedRoute><Profile/></ProtectedRoute> }
    ],
  },
]);

const query = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={query}>
      <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router} />
        </CounterContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}