import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { Toast } from "../components/toast";
import { Router } from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: use logger to avoid console logging out error and control the log in production
  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

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
