export const getGoogleUserProfile = async (accessToken: string) => {
  return fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
