import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

  import Home from "../routes/Home";

  function AppRouter(){
      return(
        <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element = {<Home />} />
          
        </Routes>
      </Router>
      )
  }

  export default AppRouter;