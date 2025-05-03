import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  issueJwt(firebaseUser: any) {
    const payload = {
      sub: firebaseUser.uid,
      email: firebaseUser.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  verifyJwt(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid internal token');
    }
  }
}
