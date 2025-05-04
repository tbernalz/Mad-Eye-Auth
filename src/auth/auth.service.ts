import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

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
}
