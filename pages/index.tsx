import type { NextPage } from "next";
import React from "react";
import { Layout } from "../components";
import styles from "../styles/Home.module.css";
import { LoginForm } from "../components/home";
import { Button } from "../components/button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.leftPanel}>
        <h1>Welcome to Icarus</h1>
        <section>
          <p>
            Icarus is an open-source project management web application that
            helps teams collaborate and track their work. The application is
            designed to be user-friendly, customizable, and scalable, making it
            suitable for teams of all sizes.
          </p>
        </section>
      </div>
      <div className={styles.rightPanel}>
        <h1>Icarus</h1>
        <section>
          <LoginForm />
          <br />
          <Button.Secondary className={styles.row} type="button">
            <Link href="/register">Create an account</Link>
          </Button.Secondary>
        </section>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  /** middleware */
  // const publicRouteMiddleware = await PublicRouteMiddleware(context);
  // if (publicRouteMiddleware.redirect) {
  //   return publicRouteMiddleware;
  // }

  return {
    props: {},
  };
};

export default Home;
