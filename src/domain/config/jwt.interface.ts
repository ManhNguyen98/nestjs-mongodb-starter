export interface JwtConfig {
  getJwtAccessTokenSecret(): string;
  getJwtAccessTokenExpTime(): number;
  getJwtRefreshTokenSecret(): string;
  getJwtRefreshTokenExpTime(): number;
}
