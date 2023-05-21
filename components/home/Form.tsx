import React from "react";
import { useRouter } from "next/router";
import { Input } from "../input/Input";
import { Button } from "../button";
import { setInfoCookie } from "../../utils";
import { Spinner } from "../Spinner";
import { IcarusApiAuthService } from "../../service/icarus-api/auth";

export const LoginForm = () => {
  const router = useRouter();
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          const formSubmitted = await FormSubmitHandler(event, payload);
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
              InputChangeHandler(event, setPayload)
            }
          />
        </div>
        <br />
        <div>
          <Input.Password
            label="Password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              InputChangeHandler(event, setPayload)
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
  const loginUserResponse = await new IcarusApiAuthService().login(payload);
  if (!loginUserResponse.ok) {
    const { message } = await loginUserResponse.json();
    console.log(loginUserResponse);
    // Create cookie with error message
    // Validation error
    // Create cookie with error message
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
