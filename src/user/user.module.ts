import { Module } from '@nestjs/common';
import { UserConsumer } from './consumers/user.consumer';
import { UserService } from './user.service';

@Module({
  providers: [UserConsumer, UserService],
})
export class UserModule {}
