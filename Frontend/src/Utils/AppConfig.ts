interface ExternalApi {
    googleMapsUrl: string;
    wikipediaUrl: string;
}

class AppConfig {
    public serverUrl = "http://localhost:4000/api/";
    public clientUrl = "http://localhost:3000/";

    public externalApi: ExternalApi = {
        googleMapsUrl: 'https://www.google.com/maps/search/',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/'
    };
}

const appConfig = new AppConfig();

export default appConfig;
