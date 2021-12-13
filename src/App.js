
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hotels  from './collection/Hotels'

import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from "react-router-dom";
import HotelsUpadate from './collection/HotelsUpdate';


function App (){
    return(
     <>

     {/* <h1>ay 7aga</h1> */}
   <Router >
    <Switch>
       <Route path={'/'}  exact component={Hotels} />
       <Route path={"/HotelsUpdate/:id"}  component={HotelsUpadate} />
       <Route path={"/addHotels"}  exact  component={HotelsUpadate} />
  </Switch> 
 </Router> 
 </> 
    )

}
export default App;
