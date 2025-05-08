import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as admin from 'firebase-admin';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public auth: admin.auth.Auth;
  private apiKey: string;
  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.FIREBASE_API_KEY || '';
  }

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }
    this.auth = admin.auth();
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload),
      );
      console.log(`response data: ${JSON.stringify(response.data)}`);

      return response.data.idToken;
    } catch (error) {
      console.error(
        `Firebase sign-in failed: ${error.response?.data?.error?.message || error.message}`,
      );
      throw new Error('Invalid email or password');
    }
  }

  async createPasswordless(email: string): Promise<any> {
    try {
      const user = await this.auth.createUser({
        email,
      });
      return user.uid;
    } catch (error) {
      console.error(`Error during loginWithoutPassword: ${error.message}`);
      throw error;
    }
  }

  async generateSetPasswordUlr(email: string) {
    return await admin.auth().generatePasswordResetLink(email);
  }
}
