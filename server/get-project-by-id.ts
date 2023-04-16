/**
 * To manually pass cookies to API requests in Next.js server-side rendering,
 * it's necessary to include the cookie parameter as an option since it doesn't automatically send cookies.
 * @param id
 * @param cookie
 * @returns
 */
export const getProjectByIdApi = (id: number, cookie?: string) => {
  if (cookie)
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: "GET",
    credentials: "include",
  });
};
