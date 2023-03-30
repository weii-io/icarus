import type { NextPage } from "next";
import React from "react";
import { TypingTextEffect } from "../components";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { PublicRouteMiddleware } from "../middleware";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Icarus - Project Management Tools for weii.io</title>
        <meta
          name="description"
          content="Project Management Tools powered by weii.io"
        />
        {/* TODO: update fav icon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TypingTextEffect
        style={{ fontSize: "4rem" }}
        text="Welcome to Icarus"
        typingSpeed={100}
      />
      <Link href="/register">
        <h1>Create an account</h1>
      </Link>
      <Link href="/login">
        <h1>Already have an account</h1>
      </Link>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  /** middleware */
  const publicRouteMiddleware = await PublicRouteMiddleware(context);
  if (publicRouteMiddleware.redirect) {
    return publicRouteMiddleware;
  }

  return {
    props: {},
  };
};

export default Home;
