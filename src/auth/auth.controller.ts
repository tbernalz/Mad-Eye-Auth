import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-with-password')
  async login(@Body() loginDto: LoginDto) {
    console.log('inside auth/login POST!!!!!!!');
    const token = await this.authService.createWithPassword(loginDto);
    return { accessToken: token };
  }
}
