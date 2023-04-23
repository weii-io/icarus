import { destroyCookie, parseCookies } from "nookies";
import { Error } from "./Error";
import { Success } from "./Success";
import { TInfo } from "./type";
import React from "react";
import { useRouter } from "next/router";

export const InfoToast = () => {
  const [type, setType] = React.useState<TInfo | null>(null);
  const [message, setMessage] = React.useState<string>("");
  const [showToast, setShowToast] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const cookies = parseCookies();
    if (cookies.info) {
      const info = JSON.parse(cookies.info);
      setShowToast(true);
      setType(info.type);
      setMessage(info.message);
    }

    const handleRouteChange = () => {
      const newCookies = parseCookies();
      if (newCookies.info) {
        const info = JSON.parse(newCookies.info);
        setType(info.type);
        setMessage(info.message);
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          destroyCookie(null, "info");
        }, 5000);
      } else {
        setShowToast(false);
      }
    };

    const destoryToastIfRouteNotChanged = setTimeout(() => {
      setShowToast(false);
      destroyCookie(null, "info");
    }, 5000);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      clearTimeout(destoryToastIfRouteNotChanged);
    };
  }, [router]);

  if (!showToast) return <></>;
  switch (type) {
    case "success":
      return (
        <Success handleClose={() => setShowToast(false)} message={message} />
      );
    case "error":
      return (
        <Error handleClose={() => setShowToast(false)} message={message} />
      );
    default:
      return <></>;
  }
};
