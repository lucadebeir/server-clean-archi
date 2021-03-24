export const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        HOST: process.env.HOST_LOCAL,
        PORT: process.env.PORT_LOCAL,
        DB_NAME: process.env.DB_NAME_LOCAL,
        DB_USER: process.env.DB_USER_LOCAL,
        DB_PASSWORD: process.env.DB_PASSWORD_LOCAL,
      };

    case "production":
      return {
        HOST: process.env.HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
      };

    default:
      return {
        HOST: process.env.HOST_LOCAL,
        PORT: process.env.PORT_LOCAL,
        DB_NAME: process.env.DB_NAME_LOCAL,
        DB_USER: process.env.DB_USER_LOCAL,
        DB_PASSWORD: process.env.DB_PASSWORD_LOCAL,
      };
  }
};
