import { NextRouter, useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React from "react";
import { ERROR } from "../../enum";
import { loginUser } from "../../api";
import { Input } from "../input/Input";
import { Button } from "../button";
import styles from "../../styles/LoginForm.module.css";

export const LoginForm = () => {
  const router = useRouter();
  const [showError, setShowError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [loginPayload, setLoginPayload] = React.useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  React.useEffect(() => {
    const login_error = parseCookies(null)[ERROR.LOGIN_ERROR];
    if (login_error) {
      setErrorMessage(login_error);
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        destroyCookie(null, ERROR.LOGIN_ERROR);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  React.useEffect(() => {
    const registration_success = parseCookies(null)[ERROR.REGISTRATION_SUCCESS];
    if (registration_success) {
      setSuccessMessage(registration_success);
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        destroyCookie(null, ERROR.REGISTRATION_SUCCESS);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      {showError && <p>{errorMessage}</p>}
      {showSuccess && <p>{successMessage}</p>}
      <form
        onSubmit={(event) => FormSubmitHandler(event, router, loginPayload)}
      >
        <div className="row">
          <Input.Email
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              InputChangeHandler(event, setLoginPayload)
            }
          />
        </div>
        <div className="row">
          <Input.Password
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              InputChangeHandler(event, setLoginPayload)
            }
          />
        </div>
        <Button.Primary className="row" type="submit">
          Login
        </Button.Primary>
      </form>
    </div>
  );
};

const FormSubmitHandler = async (
  event: React.FormEvent<HTMLFormElement>,
  router: NextRouter,
  payload: any
) => {
  event.preventDefault();
  const loginUserResponse = await loginUser(payload);
  if (!loginUserResponse.ok) {
    const { statusCode, message } = await loginUserResponse.json();
    // Create cookie with error message
    // Validation error
    // Create cookie with error message
    setCookie(
      null,
      "login_error",
      Array.isArray(message) ? message.join(", ") : message,
      {
        maxAge: 1, // 1 hour
        path: "/",
      }
    );
    // Redirect to register page
    router.reload();
  }
  router.push("/dashboard");
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
