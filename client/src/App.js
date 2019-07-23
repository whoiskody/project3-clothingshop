import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Shops from './components/Shops'
import Nav from './components/Nav'
import Product from './components/Product'
import SingleShop from './components/SingleShop';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
      <Nav />
      <div>
        <Switch>
          <Route exact path="/" component={Shops}/>
          <Route path='/shops/:shopId' component={SingleShop}/>
          <Route path='/product' component={Product}/>
        </Switch>
        </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
