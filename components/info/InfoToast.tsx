import { destroyCookie, parseCookies } from "nookies";
import { Error } from "./Error";
import { Success } from "./Success";
import { TInfo } from "./type";
import React from "react";

export const InfoToast = () => {
  const [type, setType] = React.useState<TInfo | null>(null);
  const [message, setMessage] = React.useState<string>("");

  // TODO: multiple toast still results in error

  React.useEffect(() => {
    const cookies = parseCookies();
    if (cookies.info) {
      const info = JSON.parse(cookies.info);
      console.log(info);
      setType(info.type);
      setMessage(info.message);
    }
  }, []);

  switch (type) {
    case "success":
      return <Success message={message} />;
    case "error":
      return <Error message={message} />;
    default:
      return <></>;
  }
};
