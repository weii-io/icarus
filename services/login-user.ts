import { LoginUserDto } from "./dto";

export async function loginUser(dto: LoginUserDto) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
    credentials: "include",
  });
}
