import { NextRouter, useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React from "react";
import { ERROR } from "../enum";
import { loginUser } from "../api";
import { GetServerSidePropsContext } from "next";

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
    if (statusCode === 400) {
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

function Login({ loginError }: { loginError?: string }) {
  const router = useRouter();
  const [showError, setShowError] = React.useState(false);

  const [loginPayload, setLoginPayload] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    const error = parseCookies(null)[ERROR.LOGIN_ERROR];
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        destroyCookie(null, ERROR.LOGIN_ERROR);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      {showError && <p>{loginError}</p>}
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = parseCookies(context);
  const loginError = cookies[ERROR.LOGIN_ERROR] || "";
  return {
    props: {
      loginError,
    },
  };
};

export default Login;
