import './App.css';
import { StarwarsProvider } from './context/StarwarsProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Starship from './Pages/Starship';

function App() {
  return (
    <Router>
      <StarwarsProvider>
        <Route exact path='/' component={Home} />
        <Route exact path='/starships/:id' component={Starship} />
      </StarwarsProvider>
    </Router>
  );
}

export default App;
