import React from "react";
import { RegisterContext } from "../../../context";
import { IRegisterContext } from "../../../context/interface";
import { Input } from "../../input";
import { PasswordStrengthChecker } from "../PasswordStrengthChecker";
import { Button } from "../../button";
export const ChooseAPassword = () => {
  const { form, payload, setPayload, activeTab, setActiveTab } =
    React.useContext(RegisterContext) as IRegisterContext;

  return (
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
            value={payload.password}
            onChange={(event) =>
              setPayload({ ...payload, password: event.currentTarget.value })
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
        <PasswordStrengthChecker password={payload.password} />
        <br />
        <div>
          <Input.Password
            id="confirmPassword"
            label="Confirm password"
            value={payload.confirmPassword}
            onChange={(event) => {
              setPayload({
                ...payload,
                confirmPassword: event.currentTarget.value,
              });
              if (event.currentTarget.value !== payload.password) {
                event.currentTarget.setCustomValidity("Passwords do not match");
              } else {
                event.currentTarget.setCustomValidity("");
              }
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
  );
};
