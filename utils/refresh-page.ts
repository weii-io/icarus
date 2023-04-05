import { NextRouter } from "next/router";

export function refreshPage(router: NextRouter) {
  router.replace(router.asPath);
}
