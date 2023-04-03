export const getProjectById = (cookie: string | undefined, id: number) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookie as string,
    },
  });
};
