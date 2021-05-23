import './App.css';
import { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Provider } from 'react-redux';
import store from './store';
const App = () => {
  useEffect(() => {
    //Init Materialize Javascript
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <div class='container'>
            <Switch>
              <Route exact path='/about' component={About} />
              <Route exact path='/' component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
