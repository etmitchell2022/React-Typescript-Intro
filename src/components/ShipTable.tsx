import { useContext } from 'react';
import StarwarsContext, { useStarwars } from '../context/StarwarsProvider';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StarshipTypes } from '../context/StarwarsProvider';
import ShipsTableRow from './ShipsTableRow';

const useStyles = makeStyles({
  tableContainer: {
    width: '60%',
  },
  table: {
    minWidth: '60%',
  },
});

const ShipTable = () => {
  const classes = useStyles();
  const { starships, selected, filtered, searchText } = useStarwars();

  const checkManufacturer = (starship: StarshipTypes) => {
    if (starship.manufacturer === selected) return starship;
  };

  const selectedShip = starships.filter(checkManufacturer);

  let filterList;
  if (searchText && filtered.length === 0) {
    return <h1>No results found</h1>;
  } else if (!searchText && filtered.length === 0) {
    filterList = starships;
  } else {
    filterList = filtered;
  }

  return (
    <TableContainer
      component={Paper}
      elevation={4}
      className={classes.tableContainer}
    >
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='left'>Manufacturer</TableCell>
            <TableCell align='left'>Class</TableCell>
            <TableCell align='left'>Length</TableCell>
            <TableCell align='left'>Passengers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selected
            ? selectedShip.map((starship) => (
                <ShipsTableRow key={starship.name} starship={starship} />
              ))
            : filterList.map((starship: StarshipTypes) => (
                <ShipsTableRow key={starship.name} starship={starship} />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipTable;
