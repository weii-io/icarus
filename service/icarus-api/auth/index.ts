import { IcarusApiService } from "..";
import { LoginUserDto, RegisterUserDto } from "../../dto";

export class IcarusApiAuthService extends IcarusApiService {
  constructor() {
    super();
  }

  login(dto: LoginUserDto, cookie?: string) {
    const url = this.API_URL.concat("/auth").concat("/login");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (cookie) headers.set("Cookie", cookie);
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dto),
      credentials: "include",
    };
    return fetch(url, options);
  }

  logout(cookie?: string) {
    const url = this.API_URL.concat("/auth").concat("/logout");
    const headers = new Headers();
    if (cookie) headers.set("Cookie", cookie);
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      credentials: "include",
    };
    return fetch(url, options);
  }

  register(dto: RegisterUserDto, cookie?: string) {
    const url = this.API_URL.concat("/auth").concat("/register");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (cookie) headers.set("Cookie", cookie);
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dto),
      credentials: "include",
    };
    return fetch(url, options);
  }
}
