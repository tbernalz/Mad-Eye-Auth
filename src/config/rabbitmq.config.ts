export const rabbitMQConfig = () => ({
  exchanges: {
    consumer: {
      auth: 'madeye_auth_users',
    },
    publisher: {
      notification: 'hedwig_notification_users',
    },
  },
  queues: {
    authRequest: 'auth.request.queue',
  },
  routingKeys: {
    authRequest: 'auth.request',
    notificationRequest: 'notification.request',
  },
});
