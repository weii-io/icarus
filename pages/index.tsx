import type { NextPage } from "next";
import React from "react";
import { Icon, Layout, Spacer } from "../components";
import styles from "../styles/Home.module.css";
import { LoginForm } from "../components/home";
import { Button } from "../components/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { GOOGLE_OAUTH2_URL } from "../constant/google-oauth-url";

const Home: NextPage = () => {
  const router = useRouter();
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
          <Spacer direction="vertical" size={8} />
          <div
            style={{
              textAlign: "center",
            }}
          >
            or
          </div>
          <Spacer direction="vertical" size={8} />
          {/* TODO: complete this feature */}
          <Button.Primary
            onClick={() => {
              router.push(`${GOOGLE_OAUTH2_URL}`);
            }}
            type="button"
            className={styles.googleBtn}
          >
            <Icon
              viewBox="0 0 48 48"
              width={24}
              height={24}
              strokeColor="none"
              strokeWidth={0}
              fillColor="none"
            >
              <Icon.GoogleColor />
            </Icon>
            Continue with Google
          </Button.Primary>
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
