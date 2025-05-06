import { Module } from '@nestjs/common';
import { UserConsumer } from './consumers/user.consumer';
import { UserPublisher } from './publishers/user.publisher';
import { UserService } from './user.service';
import { RabbitMQSharedModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQSharedModule],
  providers: [UserConsumer, UserPublisher, UserService],
})
export class UserModule {}
