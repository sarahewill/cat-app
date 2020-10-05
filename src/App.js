import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Container, GridColumn} from "semantic-ui-react";
import Favorites from "./Favorites";
import Home from "./Home";
import './App.css';

function App() {

  return (
      <Router>
        <Container className="App two column grid">
           <GridColumn className={'two wide column computer only'}>
               <div className="ui vertical labeled icon menu computer only row">
                   <Link to={'/'} className="item">
                       <i className="github alternate icon"/>
                       Home
                   </Link>
                   <Link to={'/favorites'} className="item">
                       <i className="heart outline icon" />
                       Favorites
                   </Link>
               </div>
           </GridColumn>
            <GridColumn className={'tablet only mobile only row'}>
                <div className={'ui two item menu'}>
                    <Link to={'/'} className="item">
                        Home
                    </Link>
                    <Link to={'/favorites'} className="item">
                        Favorites
                    </Link>
                </div>
            </GridColumn>
            <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/favorites' component={Favorites} />
            </Switch>
        </Container>
      </Router>
  );
}

export default App;
