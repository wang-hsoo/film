import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

  import Home from "../routes/Home";

  function AppRouter(movie){
      return(
        <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element = {<Home movie = {movie}/>} />
          
        </Routes>
      </Router>
      )
  }

  export default AppRouter;