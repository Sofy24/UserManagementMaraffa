import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../../application/ports/user.port';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: Record<string, unknown>): string {
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
