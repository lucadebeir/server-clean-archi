export class EnvironmentFile {
  public getEnvironment() {
    switch (process.env.NODE_ENV) {
      case "development":
        break;

      case "production":
        break;
    }
  }
}
