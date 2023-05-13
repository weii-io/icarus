import React from "react";
import { Primary } from "./Primary";
import { Secondary } from "./Secondary";
import { TBaseButtonProps } from "./button.type";

type TSubComponents = {
  Primary: React.FC<TBaseButtonProps>;
  Secondary: React.FC<TBaseButtonProps>;
};

export const Button: TSubComponents = {
  Primary,
  Secondary,
};
