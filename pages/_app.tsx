import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { InfoToast } from "../components/info-toast";

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: use logger to avoid console logging out error and control the log in production
  // TODO: optimize data fetching
  // check parallel fetching and waterfall fetching
  // error: Warning: data for page "/dashboard" is 161 kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.
  // See more info here: https://nextjs.org/docs/messages/large-page-data
  return (
    <>
      <Head>
        <title>Icarus - Project Management Tools for weii.io</title>
        <meta
          name="description"
          content="Project Management Tools powered by weii.io"
        />
      </Head>
      <InfoToast />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
