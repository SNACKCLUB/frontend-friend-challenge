import React from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={2500} />
    </AuthProvider>
  );
};

export default MyApp;
