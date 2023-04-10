export function getTasks(cookie: string | undefined, projectId: number) {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks?projectId=${projectId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookie as string,
      },
    }
  );
}
