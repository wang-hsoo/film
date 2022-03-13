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
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                 <Route path="/Login">
                    <Login />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
                
            </Switch>
        </Router>
    )
});

export default AppRouter;