import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import downloadCsv from "../../../Utils/DownloadCsv";
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';

type CsvDownloaderProps = {
    vacations: VacationModel[];
}

function CsvDownloader(props: CsvDownloaderProps): JSX.Element {

    const handleDownload = () => {
        downloadCsv.download(props.vacations);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} >
            <Typography variant="h4" color='primary' >
                Download CSV
            </Typography>
            <Typography variant="h6">
                CSV Format Example:
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Followers</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Tel Aviv</TableCell>
                        <TableCell>Israel</TableCell>
                        <TableCell>100</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Rome</TableCell>
                        <TableCell>Italy</TableCell>
                        <TableCell>255</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" size="medium" onClick={handleDownload} sx={{ m: 0 }}>
                <DownloadTwoToneIcon />
            </Button>
        </Box>
    );
}

export default CsvDownloader;
