import Bull from 'bull';

const redisConfig = {
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null
};

export const createBullConsumer = (queueName: string): Bull.Queue => {
  return new Bull(queueName, {
    redis: redisConfig,
    prefix: `bull:${queueName}`
  });
};