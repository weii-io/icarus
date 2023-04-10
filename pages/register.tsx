import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { NextRouter, useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { PasswordStrengthChecker, Tab } from "../components/register";
import { Icon, Layout } from "../components";
import styles from "../styles/Register.module.css";
import { createUser } from "../api";
import { PublicRouteMiddleware } from "../middleware";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { setInfoCookie } from "../utils";

interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [createUserPayload, setCreateUserPayload] =
    React.useState<CreateUserPayload>({
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
      form: (
        <>
          <h1>Your details</h1>
          <p>Please provide your name and email.</p>
          <br />
          <div>
            <div>
              <Input.Text
                value={createUserPayload.firstName}
                id={"firstName"}
                autoComplete="given-name"
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                label="First name"
                required={true}
              />
            </div>
            <div>
              <Input.Text
                value={createUserPayload.lastName}
                id={"lastName"}
                autoComplete="family-name"
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                label="Last name"
                required={true}
              />
            </div>
            <div>
              <Input.Email
                label="Email"
                value={createUserPayload.email}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
              />
            </div>
            <br />
            <Button.Secondary
              type="button"
              onClick={() => {
                // validation before continuing to next tab
                // validate first name is not empty
                // validate last name is not empty
                // validate email is not empty
                // validate email is valid
                if (form.current?.reportValidity()) setActiveTab(activeTab + 1);
              }}
            >
              Continue
            </Button.Secondary>
          </div>
          <br />
          <span>or</span>
          <br />
          <Button.Primary type="button" className={styles.googleBtn}>
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
            Sign up with Google
          </Button.Primary>
        </>
      ),
    },
    {
      title: "Choose a password",
      description: "Must be at least 8 characters",
      form: (
        <>
          <h1>choose a password</h1>
          <p>Must be at least 8 characters</p>
          <br />
          <div>
            {/* fix for [DOM Warning] Password forms should have (optionally hidden) username fields for accessibility" in console even with hidden username field */}
            <input hidden type="text" autoComplete="username" />
            <div>
              <Input.Password
                label="Password"
                value={createUserPayload.password}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*])[A-Za-z\d_!@#$%^&*]{8,}$"
                onInvalid={(event) => {
                  if (event.currentTarget.validity.patternMismatch)
                    event.currentTarget.setCustomValidity(
                      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                    );
                }}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity("");
                }}
                required={true}
              />
            </div>
            <PasswordStrengthChecker password={createUserPayload.password} />
            <br />
            <div>
              <Input.Password
                id="confirmPassword"
                label="Confirm password"
                value={createUserPayload.confirmPassword}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                pattern={`^${createUserPayload.password}$`}
                onInvalid={(event) => {
                  if (event.currentTarget.validity.patternMismatch)
                    event.currentTarget.setCustomValidity("Password not match");
                }}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity("");
                }}
                required={true}
              />
            </div>
            <br />
            <div className="row">
              <Button.Secondary
                style={{
                  width: "100px",
                  marginRight: "4px",
                }}
                type="button"
                onClick={() => setActiveTab(activeTab - 1)}
              >
                back
              </Button.Secondary>
              <Button.Primary
                type="submit"
                onClick={() => {
                  // validation before continuing to next tab
                  // validate password is not empty
                  // validate password is at least 8 characters
                  // validate password matches confirm password
                  if (!form.current?.reportValidity()) return false;
                }}
              >
                Create account
              </Button.Primary>
            </div>
          </div>
        </>
      ),
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
        <form
          onSubmit={(event) =>
            FormSubmitHandler(event, createUserPayload, router)
          }
          className={styles.rightPanel}
          ref={form}
        >
          {tabs[activeTab].form}
        </form>
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
    const response = await createUser(payload);
    if (!response.ok) {
      const { message } = await response.json();
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
  /** middleware */
  const publicRouteMiddleware = await PublicRouteMiddleware(context);
  if (publicRouteMiddleware.redirect) {
    return publicRouteMiddleware;
  }

  return {
    props: {},
  };
};

export default Register;
