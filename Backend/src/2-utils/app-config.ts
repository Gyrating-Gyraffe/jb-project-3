class AppConfig {
    public port = process.env.PORT; // Load the port from .env
    public host = process.env.HOST;
    public mysql_host = process.env.MYSQL_HOST;
    public mysql_user = process.env.MYSQL_USER;
    public mysql_password = process.env.MYSQL_PASSWORD;
    public mysql_databaseName = process.env.MYSQL_DATABASENAME;
    public origin = process.env.ORIGIN;
    public domainName = `http://${this.host}:${this.port}`;
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
