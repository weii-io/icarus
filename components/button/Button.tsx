import React from "react";
import { BaseButtonProps } from "./button.interface";
import { Primary } from "./Primary";
import { Secondary } from "./Secondary";

type ButtonSubComponents = {
  Primary: React.FC<BaseButtonProps>;
  Secondary: React.FC<BaseButtonProps>;
};

export const Button: ButtonSubComponents = {
  Primary,
  Secondary,
};
