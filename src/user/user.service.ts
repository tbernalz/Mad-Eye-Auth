import { Injectable, Logger } from '@nestjs/common';
import { RABBITMQ_CONFIG } from 'src/config/rabbitmq.constants';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserPublisher } from './publishers/user.publisher';
import { UserEventTypeEnum } from './enum/user-event-type.enum';
import { UserRequestEventDto } from './dto/user-request-event.dto';
import { UserSignInUriDto } from './dto/user-sign-in-uri.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private static readonly rabbitmqConfig = RABBITMQ_CONFIG;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userPublisher: UserPublisher,
  ) {}

  async handleUserEvents(
    userId: UserRequestEventDto['headers']['userId'],
    operation: UserRequestEventDto['headers']['eventType'],
    message: UserRequestEventDto['payload'],
  ): Promise<void> {
    try {
      switch (operation) {
        case UserEventTypeEnum.FIRST_SIGNIN:
          await this.sendSetPassword(message.email);
          break;

        default:
          throw new Error(`Unsupported operation: ${operation}`);
      }
    } catch (error) {
      this.logger.error(
        `Message processing in handleUserRequest failed: ${error.message}`,
        error.stack,
      );
    }
  }

  async sendSetPassword(email: string) {
    const passwordSetUri =
      await this.firebaseService.generateSetPasswordUlr(email);

    const userSignInUriDto: UserSignInUriDto = {
      email,
      passwordSetUri,
    };

    const message: UserRequestEventDto['payload'] = userSignInUriDto;
    const headers: UserRequestEventDto['headers'] = {
      userId: '',
      eventType: UserEventTypeEnum.FIRST_SIGNIN,
      timestamp: new Date().toISOString(),
    };

    await this.userPublisher.publishUserEvent(
      UserService.rabbitmqConfig.exchanges.publisher.notification,
      UserService.rabbitmqConfig.routingKeys.notificationRequest,
      message,
      headers,
    );
  }
}
