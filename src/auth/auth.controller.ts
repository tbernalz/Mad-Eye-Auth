import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginWithEmailAndPassword(@Body() loginDto: LoginDto) {
    const token = await this.authService.loginWithEmailAndPassword(loginDto);
    return { accessToken: token };
  }

  @Get('validate-token')
  @UseGuards(FirebaseAuthGuard)
  validateToken() {
    console.log(`trying to validate tokennnnn`);
    return { isValid: true };
  }
}
