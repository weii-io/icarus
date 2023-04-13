export const getGithubUser = async (accessToken: string) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);
  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };
  return fetch("https://api.github.com/user", options);
};
