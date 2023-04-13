import React from "react";
import { Email } from "./Email";
import { Password } from "./Password";
import { Text } from "./Text";
import { BaseInputProps, TextProps } from "./interface";

type InputSubComponents = {
  Email: React.FC<BaseInputProps>;
  Password: React.FC<BaseInputProps>;
  Text: React.FC<BaseInputProps & TextProps>;
};

export const Input: InputSubComponents = {
  Email,
  Password,
  Text,
};
