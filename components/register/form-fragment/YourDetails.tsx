import { RegisterContext } from "../../../context";
import { IRegisterContext } from "../../../context/interface";

import React from "react";
import { Input } from "../../input";
import { Button } from "../../button";
export const YourDetails = () => {
  const { form, payload, setPayload, activeTab, setActiveTab } =
    React.useContext(RegisterContext) as IRegisterContext;

  return (
    <>
      <h1>Your details</h1>
      <p>Please provide your name and email.</p>
      <br />
      <div>
        <div>
          <Input.Text
            value={payload.firstName}
            id={"firstName"}
            autoComplete="given-name"
            onChange={(event) =>
              setPayload({ ...payload, firstName: event.target.value })
            }
            label="First name"
            required={true}
          />
        </div>
        <div>
          <Input.Text
            value={payload.lastName}
            id={"lastName"}
            autoComplete="family-name"
            onChange={(event) =>
              setPayload({ ...payload, lastName: event.target.value })
            }
            label="Last name"
            required={true}
          />
        </div>
        <div>
          <Input.Email
            label="Email"
            value={payload.email}
            onChange={(event) =>
              setPayload({ ...payload, email: event.target.value })
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
    </>
  );
};
