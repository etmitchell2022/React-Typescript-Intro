import {  useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useStarwars } from '../context/StarwarsProvider';

const useStyles = makeStyles(() => ({
  shipTitle: {
    textAlign: 'center',
    padding: '1rem',
  },
}));

const Starship = () => {
  const classes = useStyles();
  const { id }: any = useParams();

  const starwarsContext = useStarwars();
  const {shipInfo, getShipInfo } = starwarsContext;

  useEffect(() => {
    getShipInfo(id);
  }, []);

  if (shipInfo === null) {
    return <h1>Error</h1>;
  }
  console.log(shipInfo)
  return (
    <div>
      <NavBar />
      <Typography className={classes.shipTitle} variant='h4'>
        {id}
      </Typography>
      <Typography>{shipInfo.name}</Typography>
    </div>
  );
};

export default Starship;
