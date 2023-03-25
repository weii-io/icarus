import type { NextPage } from "next";
import React from "react";
import { TypingTextEffect } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <TypingTextEffect
        style={{ fontSize: "4rem" }}
        text="Welcome to Icarus"
        typingSpeed={100}
      />
      <a href="/register">
        <h1>Create an account</h1>
      </a>
      <a href="/login">
        <h1>Already have an account</h1>
      </a>
    </div>
  );
};

export default Home;
