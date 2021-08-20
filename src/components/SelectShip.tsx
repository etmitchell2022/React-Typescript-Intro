import React, { useEffect, useContext, useState } from 'react';
import StarwarsContext, { useStarwars } from '../context/StarwarsProvider';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectShip: React.FC = () => {
  const classes = useStyles();
  const {
    fetchAll,
    selectManufacturer,
    manufacturers,
    resetStarships,
    selected,
  } = useStarwars();
  const [ship, setShip] = useState('');

  useEffect(() => {
    fetchAll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e: any) => {
    setShip(e.target.value);
    selectManufacturer(e.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>
          Select Starship Manufacturer
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={ship}
          onChange={handleChange}
          defaultValue={'All'}
        >
          <MenuItem value={selected} onClick={resetStarships}>
            All
          </MenuItem>
          {manufacturers.map((manufacturer) => {
            return (
              <MenuItem key={manufacturer} value={manufacturer}>
                {manufacturer}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectShip;
