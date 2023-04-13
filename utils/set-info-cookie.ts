import { setCookie } from "nookies";

export const setInfoCookie = (info: {
  message: string;
  type: "error" | "success" | "info";
}) => {
  setCookie(null, "info", JSON.stringify(info), {
    maxAge: 1,
    path: "/",
  });
};
