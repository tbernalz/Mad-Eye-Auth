import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async loginWithEmailAndPassword(loginDto: LoginDto): Promise<string> {
    try {
      const token = this.firebaseService.signInWithEmailAndPassword(
        loginDto.email,
        loginDto.password,
      );

      return token;
    } catch (error) {
      console.error(`Error during loginWithEmailAndPassword: ${error.message}`);
      throw error;
    }
  }

  async createWithPassword(loginDto: LoginDto): Promise<string> {
    try {
      const user = await this.firebaseService.auth.createUser(loginDto);
      return user.uid;
    } catch (error) {
      console.error(
        `Error while creating an user with password: ${error.message}`,
      );
      throw error;
    }
  }

  async verifyIdToken(idToken: string) {
    return await this.firebaseService.auth.verifyIdToken(idToken);
  }
}
