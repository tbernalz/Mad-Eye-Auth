import { IsNotEmpty, IsString } from 'class-validator';
import { UserEventTypeEnum } from '../enum/user-event-type.enum';

export class UserRequestEventDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  payload: any;

  @IsNotEmpty()
  headers: {
    userId: string;
    eventType: UserEventTypeEnum;
    timestamp: string;
    [key: string]: any;
  };
}
