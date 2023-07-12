import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(userName: string, password: string): Promise<any> {
    const user = await this.userService.findOne(userName);

    let hash_hex = createHash('sha256').update(password).digest('hex')
    if (user && user.password === hash_hex) {
      const { password, ...result } = user;
      return { access_token: await this.jwtService.signAsync(result)};
    }

    throw new UnauthorizedException();
  }
}
