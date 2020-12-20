declare namespace Express {
  export interface Request {
    session?: {
      accessToken?: import('./db/AccessToken').AccessToken
    }
  }
}
