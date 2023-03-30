import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true;
  return <Component {...pageProps} />;
}

export default MyApp;
