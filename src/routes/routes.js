import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useContext } from "react";
import { isLoggedInContext } from "../context/isloggedin";

const PrivateRoute = ({component : Component , ...rest}) => {
    const {isloggedin , setisloggedin } = useContext(isLoggedInContext);
  let isLoggedin = isloggedin;
  return (
    <Route {...rest} render={props=>(
      isLoggedin ? <Component {...props}/>
      : <Redirect to="/login" />
    )} />
  );
};

export default PrivateRoute;