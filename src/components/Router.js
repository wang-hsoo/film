import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import React from "react";
  import Home from "../routes/Home";

const AppRouter = (() => {
    
    

    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
});

export default AppRouter;