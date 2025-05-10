import {
  All,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @All('introspect')
  async introspect(@Req() req: Request, @Res() res: Response) {
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

      res.setHeader('X-User-Email', email);
      res.setHeader('X-User-Id', uid);

      return res.status(HttpStatus.OK).send('Authorized');
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

  // @Post('create-with-password') // remove this one, no ?
  // async createWithPassword(@Body() loginDto: LoginDto) {
  //   const token = await this.authService.createWithPassword(loginDto);
  //   return { accessToken: token };
  // }

  // @Post('create-without-password')
  // async createPasswordless(@Body() { email }: LoginDto) {
  //   const token = await this.authService.createPasswordless(email);
  //   return { accessToken: token };
  // }

  // @Post('aaa')
  // async aaa(@Body() { email }: LoginDto) {
  //   const token = await this.authService.aaa(email);
  //   return { accessToken: token };
  // }

  // @Post('change-password')
  // async changePassword(@Body() emailDto: EmailDto) {
  //   const noReplyEmail = await this.authService.changePassword(emailDto.email);
  //   return PasswordChangeResponse.generateMessage(noReplyEmail);
  // }
}
