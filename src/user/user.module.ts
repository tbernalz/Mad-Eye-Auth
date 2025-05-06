import { Module } from '@nestjs/common';
import { UserConsumer } from './consumers/user.consumer';
import { UserPublisher } from './publishers/user.publisher';
import { UserService } from './user.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { RabbitMQSharedModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [FirebaseModule, RabbitMQSharedModule],
  providers: [UserConsumer, UserPublisher, UserService],
})
export class UserModule {}
