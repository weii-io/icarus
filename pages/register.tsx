import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { NextRouter, useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { Tab } from "../components/register";
import { Icon, Layout } from "../components";
import styles from "../styles/Register.module.css";
import { createUser } from "../api";
import { ERROR } from "../enum";

interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = ({
  registrationError,
}: {
  registrationError?: string;
}) => {
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
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (registrationError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        destroyCookie(null, ERROR.REGISTRATION_ERROR);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registrationError]);

  const tabs = [
    {
      title: "Your details",
      description: "Please provide your name and email",
      form: (
        <>
          <h1>Your details</h1>
          <p>Please provide your name and email.</p>
          <button>
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
          </button>
          <div>
            <hr />
            <p>or</p>
          </div>
          <div>
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                required
                autoComplete="given-name"
                value={createUserPayload.firstName}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                type="text"
                id="firstName"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <input
                required
                autoComplete="family-name"
                value={createUserPayload.lastName}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                type="text"
                id="lastName"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={createUserPayload.email}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                required
                autoComplete="email"
                type="email"
                id="email"
              />
            </div>
            <button
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
            </button>
          </div>
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
          <div>
            {/* fix for [DOM Warning] Password forms should have (optionally hidden) username fields for accessibility" in console even with hidden username field */}
            <input hidden type="text" autoComplete="username" />
            <div>
              <label htmlFor="password">Password</label>
              <input
                required
                autoComplete="new-password"
                value={createUserPayload.password}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                onInvalid={(event) => {
                  if (event.currentTarget.validity.patternMismatch)
                    event.currentTarget.setCustomValidity(
                      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                    );
                }}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity("");
                }}
                type="password"
                id="password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                required
                autoComplete="new-password"
                pattern={`^${createUserPayload.password}$`}
                onInvalid={(event) => {
                  if (event.currentTarget.validity.patternMismatch)
                    event.currentTarget.setCustomValidity("Password not match");
                }}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity("");
                }}
                value={createUserPayload.confirmPassword}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                type="password"
                id="confirmPassword"
              />
            </div>
            <button
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
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Layout>
        <div className={styles.panel}>
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
          className={styles.panel}
          ref={form}
        >
          {showError && <p>{registrationError}</p>}
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
  } catch (context: any) {
    const { error, message, statusCode } = context.response.data;
    if (statusCode === 400) {
      // Validation error
      // Create cookie with error message
      setCookie(null, "registration_error", message, {
        maxAge: 1 * 60 * 60, // 1 hour
        path: "/",
      });
      // Redirect to register page
      router.reload();
    }
  }
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = parseCookies(context);
  const registrationError = cookies[ERROR.REGISTRATION_ERROR] || "";
  return {
    props: {
      registrationError,
    },
  };
};

export default Register;
