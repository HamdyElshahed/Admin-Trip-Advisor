import React from "react";
import { BrowserRouter as Router,Route, Switch} from "react-router-dom";
import PostsList from "../components/restaurant.components/PostsList";
import {RestaurantNavbar} from '../components/restaurant.components/RestaurantNavbar';

const Restaurant = () => {
  return (
    <div>
      <Router>
          <RestaurantNavbar/>
        <Switch>
            <Route path='/restaurants-posts' exact>
              <PostsList/>
              </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Restaurant;
