import { NextRouter, useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React from "react";
import { ERROR } from "../enum";
import { loginUser } from "../api";
import { GetServerSidePropsContext } from "next";
import { PublicRouteMiddleware } from "../middleware";

function Login() {
  const router = useRouter();
  const [showError, setShowError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

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
        <div>
          <label htmlFor="email">Email:</label>
          <input
            required
            onChange={(event) => InputChangeHandler(event, setLoginPayload)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            required
            onChange={(event) => InputChangeHandler(event, setLoginPayload)}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const FormSubmitHandler = async (
  event: React.FormEvent<HTMLFormElement>,
  router: NextRouter,
  payload: any
) => {
  event.preventDefault();
  try {
    const response = await loginUser(payload);
    router.push("/dashboard");
  } catch (context: any) {
    const { message, statusCode } = context.response.data;
    if (statusCode > 400) {
      // Validation error
      // Create cookie with error message
      setCookie(
        null,
        "login_error",
        Array.isArray(message) ? message.join(", ") : message,
        {
          maxAge: 1 * 60 * 60, // 1 hour
          path: "/",
        }
      );
      // Redirect to register page
      router.reload();
    }
  }
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

export default Login;
