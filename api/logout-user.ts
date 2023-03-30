import axios from "axios";

export async function logoutUser(cookie: string | undefined) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    undefined,
    { withCredentials: true, headers: { cookie: cookie } }
  );
}
