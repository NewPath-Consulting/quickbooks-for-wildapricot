export interface IWAAuthBody {
  apiKey: string,
  refreshToken ?: string
}

export interface IWARefreshTokenBody {
  clientId: string,
  clientSecret: string,
  refreshToken: string
}

export interface IWALoginBody {
  clientId: string,
  clientSecret: string
}