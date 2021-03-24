export const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        AUTH_CLIENT: process.env.AUTH_CLIENT,
        AUTH_CLIENT_PASSWORD: process.env.AUTH_CLIENT_PASSWORD,
        AUTH_URL: process.env.AUTH_URL,

        AUTH_USER: process.env.AUTH_USER,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
      };

    case "production":
      return {
        AUTH_CLIENT: process.env.AUTH_CLIENT,
        AUTH_CLIENT_PASSWORD: process.env.AUTH_CLIENT_PASSWORD,
        AUTH_URL: process.env.AUTH_URL,

        AUTH_USER: process.env.AUTH_USER,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
      };

    default:
      return {
        AUTH_CLIENT: process.env.AUTH_CLIENT,
        AUTH_CLIENT_PASSWORD: process.env.AUTH_CLIENT_PASSWORD,
        AUTH_URL: process.env.AUTH_URL,

        AUTH_USER: process.env.AUTH_USER,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
      };
  }
};
