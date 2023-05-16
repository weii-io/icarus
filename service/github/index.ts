export class GithubApiService {
  protected API_URL = "https://api.github.com";
  private OAUTH_URL = "https://github.com/login/oauth";
  private CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  private CLIENT_SECRET = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;
  constructor(protected accessToken: string) {}

  async getAccessToken(code: string) {
    const url = this.OAUTH_URL.concat("/access_token");
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        code: code,
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
      }),
    };
    return fetch(url, options);
  }

  async getLoggedInUser() {
    const url = this.API_URL.concat("/user");
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${this.accessToken}`);
    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };
    return fetch(url, options);
  }
}
