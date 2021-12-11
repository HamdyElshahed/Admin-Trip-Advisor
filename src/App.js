import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import SideBar from './components/sidebar';


function App() {
  return (
    <Router>
    <SideBar />
   {/* <Switch>
      <Route exact path="/"> <Dashboard/> </Route>
   </Switch> */}
  </Router>
  );
}

export default App;
