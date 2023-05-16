import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { NextRouter, useRouter } from "next/router";

import { PasswordStrengthChecker, Tab } from "../components/register";
import { Icon, Layout } from "../components";
import styles from "../styles/Register.module.css";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { setInfoCookie } from "../utils";
import { IcarusApiAuthService } from "../service/icarus-api/auth";
import { RegisterContext } from "../context";
import { YourDetails } from "../components/register/form-fragment/YourDetails";
import { ChooseAPassword } from "../components/register/form-fragment/ChooseAPassword";

interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [payload, setPayload] = React.useState<CreateUserPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const form = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  const tabs = [
    {
      title: "Your details",
      description: "Please provide your name and email",
      content: <YourDetails />,
    },
    {
      title: "Choose a password",
      description: "Must be at least 8 characters",
      content: <ChooseAPassword />,
    },
  ];

  return (
    <div>
      <Layout>
        <div className={styles.leftPanel}>
          <h1>Icarus</h1>
          <div>
            {tabs.map((tab, index) => (
              <Tab
                key={tab.title}
                activeIndex={activeTab}
                index={index}
                icon={
                  <Icon
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                    fillColor="none"
                    strokeColor="black"
                    strokeWidth={1.5}
                  >
                    <Icon.CheckCircle />
                  </Icon>
                }
                title={tab.title}
                description={tab.description}
              />
            ))}
          </div>
        </div>
        <RegisterContext.Provider
          value={{
            form,
            payload,
            setPayload,
            activeTab,
            setActiveTab,
          }}
        >
          <form
            onSubmit={(event) => FormSubmitHandler(event, payload, router)}
            className={styles.rightPanel}
            ref={form}
          >
            {tabs[activeTab].content}
          </form>
        </RegisterContext.Provider>
      </Layout>
    </div>
  );
};

const InputChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPayload: React.Dispatch<React.SetStateAction<any>>
) => {
  setPayload((payload: any) => {
    return {
      ...payload,
      [event.target.id]: event.target.value,
    };
  });
};

const FormSubmitHandler = async (
  event: React.FormEvent<HTMLFormElement>,
  payload: any,
  router: NextRouter
) => {
  event.preventDefault();
  try {
    const createUserResponse = await new IcarusApiAuthService().register(
      payload
    );
    if (!createUserResponse.ok) {
      const { message } = await createUserResponse.json();
      setInfoCookie({
        message: message,
        type: "error",
      });
      router.reload();
      return;
    }

    // Create cookie with success message
    setInfoCookie({
      message: "User created. Please login to continue",
      type: "success",
    });
    router.push("/");
  } catch (context: any) {
    const { error, message, statusCode } = context.response.data;
    if (statusCode === 400) {
      // Validation error
      // Create cookie with error message
      setInfoCookie({
        message: message,
        type: "error",
      });
      // Redirect to register page
      router.reload();
    }
  }
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};

export default Register;
