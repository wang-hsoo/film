import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import React from "react";
  import Home from "../routes/Home";
import Login from "../routes/Login";

const AppRouter = (() => {
    
    

    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
});

export default AppRouter;