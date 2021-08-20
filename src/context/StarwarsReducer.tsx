import { InitialStateTypes, StarshipTypes } from './StarwarsProvider';

type ActionTypes =
  | {
      type: 'FETCH_ALL_SHIPS';
      payload: any;
    }
  | { type: 'SET_CURRENT'; payload: string }
  | { type: 'RESET_STARSHIPS' }
  | { type: 'FILTER_STARSHIPS'; payload: any }
  | { type: 'GET_SHIP_INFO'; payload: StarshipTypes };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: InitialStateTypes, action: ActionTypes) => {
  switch (action.type) {
    case 'FETCH_ALL_SHIPS':
      return {
        ...state,
        manufacturers: action.payload.uniqueManufacturers,
        starships: action.payload.allShips,
        loading: true,
      };
    case 'SET_CURRENT':
      return {
        ...state,
        selected: action.payload,
      };
    case 'RESET_STARSHIPS':
      return {
        ...state,
        selected: '',
      };
    case 'FILTER_STARSHIPS':
      return {
        ...state,
        searchText: action.payload,
        filtered: state.starships.filter(
          (starship: StarshipTypes) =>
            starship.manufacturer.toLowerCase().includes(action.payload) ||
            starship.name.toLowerCase().includes(action.payload)
        ),
      };
    case 'GET_SHIP_INFO':
      return {
        ...state,
        shipInfo: action.payload,
      };
    default:
      return state;
  }
};
