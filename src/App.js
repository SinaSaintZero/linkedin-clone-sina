import { connect } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

import { getUserAuth } from './Actions';
import MyNetwork from './MyNetwork/MyNetwork';


function App(props) {

  useEffect(() => {
    props.getUserAuthInfo();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route path='/home'>
            <Header/>
            <Home/>
          </Route>
          <Route path='/mynetwork'>
            <Header/>
            <MyNetwork/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) =>{
  return{};
};

const mapDispatchToProps = (dispatch) =>({
  getUserAuthInfo : () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

