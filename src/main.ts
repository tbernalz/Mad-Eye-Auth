import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.get('firebase.projectId'),
      clientEmail: config.get('firebase.clientEmail'),
      privateKey: config.get('firebase.privateKey'),
    }),
  });

  await app.listen(config.get('port') ?? 3000);
}
bootstrap();
