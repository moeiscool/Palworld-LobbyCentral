declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT?: string;
      RATE_LIMIT_ACCESS?: string;
      RATE_LIMIT_TIME?: string;
      AUTHORIZATION?: string;
    }
  }
}
