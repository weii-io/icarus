export function getMe(cookie: string | undefined) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookie as string,
    },
  });
}
