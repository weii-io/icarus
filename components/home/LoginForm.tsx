import { NextRouter, useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React from "react";
import { loginUserApi } from "../../service";
import { Input } from "../input/Input";
import { Button } from "../button";
import { setInfoCookie } from "../../utils";
import { Spinner } from "../Spinner";

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
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          const formSubmitted = await FormSubmitHandler(event, loginPayload);
          if (formSubmitted) {
            router.push("/dashboard");
          } else {
            router.reload();
          }
        }}
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
        <Button.Primary
          style={{ display: "flex", justifyContent: "center" }}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Spinner visible color="#000" size={16} />
          ) : (
            <span>Login</span>
          )}
        </Button.Primary>
      </form>
    </div>
  );
};

const FormSubmitHandler = async (
  event: React.FormEvent<HTMLFormElement>,
  payload: any
) => {
  event.preventDefault();
  const loginUserResponse = await loginUserApi(payload);
  if (!loginUserResponse.ok) {
    const { statusCode, message } = await loginUserResponse.json();
    // Create cookie with error message
    // Validation error
    // Create cookie with error message
    console.log(message);
    setInfoCookie({
      message: Array.isArray(message) ? message.join(", ") : message,
      type: "error",
    });
    // Redirect to register page
    return false;
  }
  return true;
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
