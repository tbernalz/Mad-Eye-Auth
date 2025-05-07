import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as admin from 'firebase-admin';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public auth: admin.auth.Auth;
  private apiKey: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = process.env.FIREBASE_API_KEY || '';
  }

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('firebase.projectId'),
          clientEmail: this.configService.get('firebase.clientEmail'),
          privateKey: this.configService
            .get('firebase.privateKey')
            ?.replace(/\\n/g, '\n'),
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

  async generateSetPasswordUlr(email: string) {
    return await admin.auth().generatePasswordResetLink(email);
  }
}
