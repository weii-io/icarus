export class GoogleOAuthApiService {
  private OAUTH_URL = "https://oauth2.googleapis.com";
  private OAUTH_API_URL = "https://www.googleapis.com/oauth2/v1";

  private CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string;
  private CLIENT_SECRET = process.env
    .NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET as string;
  private REDIRECT_URI = process.env
    .NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI as string;

  getAccessToken(code: string) {
    const url = this.OAUTH_URL.concat("/token");
    const headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: new URLSearchParams({
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        redirect_uri: this.REDIRECT_URI,
        grant_type: "authorization_code",
        code,
      }),
    };
    return fetch(url, options);
  }

  getUserInfo(accessToken: string) {
    const url = this.OAUTH_API_URL.concat("/userinfo");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${accessToken}`);
    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };
    return fetch(url, options);
  }
}
