import React, { useReducer, createContext, useContext } from 'react';
import StarwarsReducer from './StarwarsReducer';

import axios from 'axios';

export type StarshipTypes = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  hyperdriveRating: number;
  MGLT: number;
  starship_class: string;
  pilors: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type DispatchTypes = {
  fetchAll: () => void;
  selectManufacturer: (manufacturer: string) => void;
  resetStarships: () => void;
  searchByShip: (manufacturer: string[] | string) => void;
  getShipInfo: (shipName: string) => void;
};

export type InitialStateTypes = {
  starships: StarshipTypes[];
  manufacturers: string[];
  selected: string;
  loading: boolean;
  filtered: StarshipTypes[];
  shipInfo: StarshipTypes | null;
  searchText: string;
};

export const initialState: InitialStateTypes = {
  manufacturers: [],
  starships: [],
  selected: '',
  loading: false,
  filtered: [],
  shipInfo: null,
  searchText: '',
};

type ContextTypes = InitialStateTypes & DispatchTypes;

const StarwarsContext = createContext<ContextTypes | undefined>(undefined);
export default StarwarsContext;

export const useStarwars = () => {
  const context = useContext(StarwarsContext);
  if (!context) {
    throw new Error('No context provided');
  }
  return context;
};

export const StarwarsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(StarwarsReducer, initialState);

  //Fetch all ships
  const fetchAll = async () => {
    const res = await axios.get('https://swapi.dev/api/starships/');
    let manufacturerdBy = res.data.results;
    let manufacturersArray = manufacturerdBy.map((manufacturer: any) => {
      return manufacturer.manufacturer;
    });
    let uniqueManufacturers = [...new Set(manufacturersArray)];
    dispatch({
      type: 'FETCH_ALL_SHIPS',
      payload: { allShips: res.data.results, uniqueManufacturers },
    });
  };

  //Set ships to selected manufacturer
  const selectManufacturer = (manufacturer: string) => {
    dispatch({ type: 'SET_CURRENT', payload: manufacturer });
  };

  //Reset Starship State
  const resetStarships = () => {
    dispatch({ type: 'RESET_STARSHIPS' });
  };

  //Search filter for ships based on name or manufacturer
  const searchByShip = (manufacturer: string[] | string) => {
    dispatch({ type: 'FILTER_STARSHIPS', payload: manufacturer });
  };

  //Get ship info for starship page
  const getShipInfo = (shipName: string) => {
    const data = state.starships.filter((starship: StarshipTypes) => {
      if (starship.name === shipName) {
        return starship;
      }
    });
    console.log(data);
    dispatch({ type: 'GET_SHIP_INFO', payload: data });
  };

  return (
    <StarwarsContext.Provider
      value={{
        manufacturers: state.manufacturers,
        starships: state.starships,
        selected: state.selected,
        loading: state.loading,
        filtered: state.filtered,
        shipInfo: state.shipInfo,
        searchText: state.searchText,
        fetchAll,
        selectManufacturer,
        resetStarships,
        searchByShip,
        getShipInfo,
      }}
    >
      {children}
    </StarwarsContext.Provider>
  );
};
