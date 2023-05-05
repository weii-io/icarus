export const getGoogleOAuthToken = async (code: string) => {
  return fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string,
      client_secret: process.env
        .NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET as string,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI as string,
      grant_type: "authorization_code",
      code,
    }),
  });
};
