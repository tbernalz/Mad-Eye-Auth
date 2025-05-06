import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public auth: admin.auth.Auth;

  constructor(private configService: ConfigService) {}

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

  async generateSetPasswordUlr(email: string) {
    return await admin.auth().generatePasswordResetLink(email);
  }
}
