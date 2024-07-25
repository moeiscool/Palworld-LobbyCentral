const { env } = process;

export enum Environments {
  DEVELOPMENT,
  PRODUCTION,
}

const parseRateLimitTime = (timeValue?: string) => {
  if (!timeValue) return 15 * 60 * 1000;

  const unit = timeValue.slice(-1);
  const time = Number(timeValue.slice(0, -1));

  console.log(unit);

  switch (unit) {
    case "h":
      return time * 60 * 60 * 1000;
    case "m":
      return time * 60 * 1000;
    case "s":
      return time * 1000;
    default:
      throw new Error(`Unexpected unit for RATE_LIMIT_TIME: ${unit}. Accepted unit: 'h', 'm' and 's'`);
  }
};

const config = {
  // Port number for the server
  port: env.PORT,

  rateLimit: {
    access: env.RATE_LIMIT_ACCESS ? Number(env.RATE_LIMIT_TIME) : 100,
    time: parseRateLimitTime(env.RATE_LIMIT_TIME),
  },

  // Authorization key
  authorization: env.AUTHORIZATION,

  // Environment type (development || production)
  environment: env.NODE_ENV === "production" ? Environments.PRODUCTION : Environments.DEVELOPMENT,
};

export default config;
