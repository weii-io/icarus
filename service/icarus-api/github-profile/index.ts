import { IcarusApiService } from "..";
import { GithubApiService } from "../../github";
import { GithubApiUserService } from "../../github/user";

export class IcarusApiGithubProfileService extends IcarusApiService {
  constructor() {
    super();
  }

  async createGithubProfile(accessToken: string, cookie?: string) {
    // TODO: creat interface for github user
    const loggedInUser = await (
      await new GithubApiService(accessToken).getLoggedInUser()
    ).json();

    const { login: username, organizations_url: organizationUrl } =
      loggedInUser;

    const url = this.API_URL.concat("/users")
      .concat("/me")
      .concat("/github-profile");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (cookie) headers.set("Cookie", cookie);
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username,
        accessToken,
      }),
      credentials: "include",
    };
    return fetch(url, options);
  }

  async deleteGithubProfile(cookie?: string) {
    const url = this.API_URL.concat("/users")
      .concat("/me")
      .concat("/github-profile");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (cookie) headers.set("Cookie", cookie);
    const options: RequestInit = {
      method: "DELETE",
      headers: headers,
      credentials: "include",
    };
    return fetch(url, options);
  }
}
