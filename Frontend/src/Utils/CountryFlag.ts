import axios from "axios";

class CountryFlag {
    public getFlagUrl = async (countryName: string): Promise<string> => {
        try {
            // Make a GET request to the Rest Countries API
            const res = await axios.get(`https://restcountries.com/v2/name/${countryName} `);
            if (res.data.length > 0) {
                const countryCode = res.data[0].alpha2Code;

                return `https://www.countryflagicons.com/SHINY/64/${countryCode}.png`;
                
            } else {
                console.log(`Country "${countryName}" not found.`);
                return '';
            }
        }
        catch(err: any) {
            console.log(err); 
        }
    }
}

const countryFlag = new CountryFlag();
export default countryFlag;