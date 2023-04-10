export async function logoutUser(cookie: string | undefined) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: cookie as string,
    },
  });
}
