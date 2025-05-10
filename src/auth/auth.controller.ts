import {
  All,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @All('introspect')
  async introspect(@Req() req: Request) {
    const authHeader = req.headers['authorization'] || '';
    const idToken = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!idToken) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        message: 'No token provided',
      };
    }

    try {
      const decodedToken = await this.authService.verifyIdToken(idToken);
      const email = decodedToken.email || '';
      const uid = decodedToken.uid;

      return {
        message: 'Authorized',
        email,
        uid,
      };
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        message: 'Invalid token',
      };
    }
  }

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
