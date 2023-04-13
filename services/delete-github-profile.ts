export const deleteGithubProfile = async (cookie: string | undefined) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/github-profile`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Cookie: cookie as string,
    },
  });
};
