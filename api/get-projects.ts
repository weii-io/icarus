export function getProjects(cookie: string | undefined) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookie as string,
    },
  });
}
