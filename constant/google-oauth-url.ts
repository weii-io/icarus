const RESPONSE_TYPE = "code";
const ACCESS_TYPE = "offline";
const SCOPE = "profile email";
export const GOOGLE_OAUTH2_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  `client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&` +
  `redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI}&` +
  `response_type=${RESPONSE_TYPE}&` +
  `access_type=${ACCESS_TYPE}&` +
  `scope=${SCOPE}`;
