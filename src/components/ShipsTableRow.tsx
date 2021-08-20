import React from 'react';
import { StarshipTypes } from '../context/StarwarsProvider';
import TableCell from '@material-ui/core/TableCell';
import { Button, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


export type Starship = {
  starship: StarshipTypes;
};

const useStyles = makeStyles(() => ({
  buttonText: {
    textDecoration: 'none'
  }
}));
const ShipsTableRow: React.FC<Starship> = ({ starship }) => {
  const classes = useStyles();
  return (
    <TableRow key={starship.name}>
      <TableCell align='left'>{starship.name}</TableCell>
      <TableCell align='left'>{starship.manufacturer}</TableCell>
      <TableCell align='left'>{starship.starship_class}</TableCell>
      <TableCell align='left'>{starship.length}</TableCell>
      <TableCell align='left'>{starship.passengers}</TableCell>
      <TableCell align='left'>
        <Link to={`/starships/${starship.name}`} className={classes.buttonText} >
          <Button variant='contained' color='primary'>
            View More
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default ShipsTableRow;
