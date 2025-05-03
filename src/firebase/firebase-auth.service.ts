import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
  async verifyIdToken(idToken: string) {
    try {
      return await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      throw new UnauthorizedException('Invalid Firebase ID token');
    }
  }
}
