import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import SideBar from './components/sidebar';
import Login from './pages/login';
import PrivateRoute from './routes/routes';
import { IsLoggedInProvider }  from './context/isloggedin'


function App() {
  const [isloggedin , setisloggedin ] = useState()
  return (
      <Router>
      <IsLoggedInProvider value={{isloggedin , setisloggedin}}>
       <Switch>
          <Route exact path="/"> <Login /> </Route>
          <Route exact path="/login"> <Login /> </Route>
          <PrivateRoute exact path="/dashboard" component={SideBar}/>
      </Switch>
    </IsLoggedInProvider>

  </Router>
  );
}

export default App;
