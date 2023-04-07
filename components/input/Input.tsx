import React from "react";
import { Email } from "./Email";
import { Password } from "./Password";
import { BaseInputProps } from "./interface";

type InputSubComponents = {
  Email: React.FC<BaseInputProps>;
  Password: React.FC<BaseInputProps>;
};

export const Input: InputSubComponents = {
  Email,
  Password,
};
