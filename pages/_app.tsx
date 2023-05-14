import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { Toast } from "../components/toast";

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: use logger to avoid console logging out error and control the log in production
  return (
    <>
      <Head>
        <title>Icarus - Project Management Tools for weii.io</title>
        <meta
          name="description"
          content="Project Management Tools powered by weii.io"
        />
      </Head>
      <Toast />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
