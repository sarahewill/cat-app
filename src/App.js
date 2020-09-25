import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import Favorites from "./Favorites";
import Home from "./Home";
import './App.css';

function App() {

  return (
      <Router>
        <Container className="App">
            <div className="ui vertical labeled icon menu">
                <Link to={'/'} className="item">
                    <i className="github alternate icon"/>
                    Home
                </Link>
                <Link to={'/favorites'} className="item">
                    <i className="heart outline icon" />
                    Favorites
                </Link>
            </div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/favorites' component={Favorites} />
            </Switch>
        </Container>
      </Router>
  );
}

export default App;
