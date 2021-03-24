export const getEnvironment = () => {
  /*const data = {
    AUTH_CLIENT: process.env.AUTH_CLIENT,
    AUTH_CLIENT_PASSWORD: process.env.AUTH_CLIENT_PASSWORD,
    AUTH_URL: process.env.AUTH_URL,

    AUTH_USER: process.env.AUTH_USER,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
  };*/
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        HOST: process.env.HOST_LOCAL,
        PORT: process.env.PORT_LOCAL,
        DB_NAME: process.env.DB_NAME_LOCAL,
        DB_USER: process.env.DB_USER_LOCAL,
        DB_PASSWORD: process.env.DB_PASSWORD_LOCAL,
        AUTH_CLIENT: process.env.AUTH_CLIENT,
        AUTH_CLIENT_PASSWORD: process.env.AUTH_CLIENT_PASSWORD,
        AUTH_URL: process.env.AUTH_URL,

        AUTH_USER: process.env.AUTH_USER,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
      };

    case "production":
      return {
        HOST: process.env.HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        AUTH_CLIENT: process.env.AUTH_CLIENT,
        AUTH_CLIENT_PASSWORD: process.env.AUTH_CLIENT_PASSWORD,
        AUTH_URL: process.env.AUTH_URL,

        AUTH_USER: process.env.AUTH_USER,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
      };

    default:
      return {
        HOST: process.env.HOST_LOCAL,
        PORT: process.env.PORT_LOCAL,
        DB_NAME: process.env.DB_NAME_LOCAL,
        DB_USER: process.env.DB_USER_LOCAL,
        DB_PASSWORD: process.env.DB_PASSWORD_LOCAL,
        AUTH_CLIENT: process.env.AUTH_CLIENT,
        AUTH_CLIENT_PASSWORD: process.env.AUTH_CLIENT_PASSWORD,
        AUTH_URL: process.env.AUTH_URL,

        AUTH_USER: process.env.AUTH_USER,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
      };
  }
};
