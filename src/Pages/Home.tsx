import React from 'react';
import NavBar from '../components/NavBar';
import SelectShip from '../components/SelectShip';
import ShipTable from '../components/ShipTable';

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className='select'>
        <SelectShip />
      </div>
      <div className='App'>
        <ShipTable />
      </div>
    </div>
  );
};

export default Home;
