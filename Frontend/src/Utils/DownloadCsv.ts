import { mkConfig, generateCsv, download, ConfigOptions } from "export-to-csv";
import VacationModel from "../Models/VacationModel";
import notifyService from "../Services/NotifyService";

// This singleton uses 'export-to-csv' library to allow an admin to download a Vacation-Follower CSV file:
class DownloadCsv {

    // mkConfig merges your options with the defaults
    // and returns WithDefaults<ConfigOptions>
    private csvConfig: Required<ConfigOptions>;

    constructor() {
        this.csvConfig = mkConfig({ useKeysAsHeaders: true, filename: 'Vacation-Followers', quoteStrings: true });
    }

    public download(vacations: VacationModel[]) {
        try {
            const csvVacations = vacations.map(v => {
                return (
                    {
                        "City": v.destination.split(', ')[0],
                        "Country": v.destination.split(', ')[1] || "",
                        "Followers": v.followerCount
                    }
                )
            });

            // Converts your Array<Object> to a CsvOutput string based on the configs
            const csv = generateCsv(this.csvConfig)(csvVacations);

            download(this.csvConfig)(csv);
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
}

const downloadCsv = new DownloadCsv();
export default downloadCsv;