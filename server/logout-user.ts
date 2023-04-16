/**
 * To manually pass cookies to API requests in Next.js server-side rendering,
 * it's necessary to include the cookie parameter as an option since it doesn't automatically send cookies.
 * @param cookie
 * @returns
 */
export async function logoutUserApi(cookie?: string) {
  if (cookie)
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
