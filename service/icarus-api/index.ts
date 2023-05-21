export class IcarusApiService {
  constructor(protected API_URL = process.env.NEXT_PUBLIC_API_URL as string) {}
}
