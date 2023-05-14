import { RegisterUserDto } from "../../service/dto";
import React from "react";
export interface IRegisterContext {
  payload: RegisterUserDto;
  setPayload: (payload: RegisterUserDto) => void;
  form: React.RefObject<HTMLFormElement>;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
