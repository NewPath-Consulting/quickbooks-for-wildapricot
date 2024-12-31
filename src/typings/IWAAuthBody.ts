export interface IWAAuthBody {
  apiKey: string,
  refreshToken ?: string
}

export interface IWALoginBody {
  clientId: string,
  clientSecret: string
}