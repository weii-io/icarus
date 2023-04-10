import { NextRouter, useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React from "react";
import { loginUser } from "../../api";
import { Input } from "../input/Input";
import { Button } from "../button";
import styles from "../../styles/LoginForm.module.css";
import { setInfoCookie } from "../../utils";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const [loginPayload, setLoginPayload] = React.useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <form
        onSubmit={(event) => FormSubmitHandler(event, router, loginPayload)}
      >
        <div>
          <Input.Email
            label="Email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              InputChangeHandler(event, setLoginPayload)
            }
          />
        </div>
        <br />
        <div>
          <Input.Password
            label="Password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              InputChangeHandler(event, setLoginPayload)
            }
          />
        </div>
        <br />
        <Button.Primary type="submit">Login</Button.Primary>
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
    setInfoCookie({
      message: Array.isArray(message) ? message.join(", ") : message,
      type: "error",
    });
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
