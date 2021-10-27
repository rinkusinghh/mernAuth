import {createContext, useReducer} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navbar } from './layout/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Error } from './components/Error';
import { LogOut } from './components/LogOut';

import { initialState, reducer } from '../src/reducer/UseReducer';

// Context APIb
export const UserContext = createContext();

const Routing = () => {
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>

      <Route path="/about">
        <About/>
      </Route>

      <Route path="/contact">
        <Contact/>
      </Route>

      <Route path="/signIn">
        <Login/>
      </Route>

      <Route path="/signUp">
        <Register/>
      </Route>

      <Route path="/logOut">
        <LogOut />
      </Route>

      <Route>
        <Error/>
      </Route>
    </Switch>
  )
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <UserContext.Provider value={{state, dispatch}} >
      <Navbar/>
      <Routing/>
    </UserContext.Provider>
    </>
  )
}
