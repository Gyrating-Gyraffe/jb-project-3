interface ExternalApi {
    googleMapsUrl: string;
    wikipediaUrl: string;
}

class AppConfig {
    public serverUrl = this.baseUrl + "/api/";

    public constructor (private baseUrl: string) { }

    public externalApi: ExternalApi = {
        googleMapsUrl: 'https://www.google.com/maps/search/',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/'
    };
}

class DevelopmentConfig extends AppConfig {
    public constructor() {
        super("http://localhost:4000");
    }
}

class ProductionConfig extends AppConfig {
    public constructor() {
        super("");
    }
}


const appConfig = new DevelopmentConfig();

export default appConfig;
