import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

  import Home from "../routes/Home";
import Login from "../routes/Login";

  function AppRouter(){
      return(
        <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/Login" element = {<Login />} />
          
        </Routes>
      </Router>
      )
  }

  export default AppRouter;