import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitMQConfig } from './config/rabbitmq.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { RabbitMQSharedModule } from './rabbitmq/rabbitmq.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitMQConfig],
    }),
    AuthModule,
    FirebaseModule,
    RabbitMQSharedModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
