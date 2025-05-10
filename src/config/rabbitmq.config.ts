export const rabbitMQConfig = () => ({
  exchanges: {
    consumer: {
      auth: 'madeye_auth_users',
      user: 'kingsley_proxy_users_requests',
    },
    publisher: {
      notification: 'hedwig_notification_users',
    },
  },
  queues: {
    authRequest: 'auth.request.queue',
    userRequest: 'users.request.queue',
  },
  routingKeys: {
    authRequest: 'auth.request',
    notificationRequest: 'notification.request',
  },
});
