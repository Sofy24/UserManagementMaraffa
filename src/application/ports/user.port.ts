export interface IAuthPort {
  login(nickname: string, password: string): Promise<string | null>;
  logout(nickname: string): Promise<void>;
  resetPassword(nickname: string, newPassword: string): Promise<void>;
}

export interface IStatsPort {
  update(dto: {
    nickname: string;
    win: boolean;
    cricca: number;
  }): Promise<boolean>;
  updateBulk(
    dtos: { nickname: string; win: boolean; cricca: number }[],
  ): Promise<string[]>;
}

export interface ITokenService {
  generateToken(payload: Record<string, unknown>): string;
}

export const TOKEN_SERVICE = Symbol('ITokenService');
