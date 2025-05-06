import { Injectable } from '@nestjs/common';

import { UserRequestEventDto } from './dto/user-request-event.dto';

@Injectable()
export class UserService {
  constructor() {}

  async handleUserEvents(
    userId: UserRequestEventDto['headers']['userId'],
    operation: UserRequestEventDto['headers']['eventType'],
    message: UserRequestEventDto['payload'],
  ): Promise<void> {}
}
