import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VacationModel from '../../../Models/VacationModel';

type VacationsTableProps = {
    vacations: VacationModel[];
}

function VacationsTable(props: VacationsTableProps): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="vacations table" size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Destination</TableCell>
            <TableCell align="left">Price&nbsp;($)</TableCell>
            <TableCell align="left">Dates&nbsp;(dd/mm/yyyy)</TableCell>
            <TableCell align="left">Followers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.vacations.map((vacation) => (
            <TableRow
              key={vacation.vacationId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {vacation.vacationId}
              </TableCell>
              <TableCell align="left">{vacation.destination}</TableCell>
              <TableCell align="left">{vacation.price}</TableCell>
              <TableCell align="left">{VacationModel.getVacationDateStrings(vacation.startDate, vacation.endDate)}</TableCell>
              <TableCell align="left">{vacation.followerCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VacationsTable;