import { setCookie } from "nookies";

export const setInfoCookie = (info: {
  message: string;
  type: "error" | "success" | "info";
}) => {
  setCookie(null, "info", JSON.stringify(info), {
    maxAge: 60, // default: 2
    path: "/",
  });
};
