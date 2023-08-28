class AppConfig {
    public port = process.env.PORT; // Load the port from .env
    public host = process.env.DB_HOST;
    public user = process.env.DB_USER;
    public password = process.env.DB_PASSWORD;
    public database = process.env.DB_NAME;
    public origin = process.env.ORIGIN;
}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
