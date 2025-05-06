export const rabbitMQConfig = () => ({
  exchanges: {
    consumer: {
      auth: 'madeye_auth_users',
    },
    publisher: {},
  },
  queues: {},
  routingKeys: {
    authRequest: 'auth.request',
  },
});
