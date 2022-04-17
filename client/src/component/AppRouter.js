import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../routes/Home";
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";
import MovieDetail from "../routes/MovieDetail";

function AppRouter(){
    return(
      <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/Login" element = {<Login />} />
        <Route path="/SignUp" element = {<SignUp />} />
        <Route path="/film/:title" element={<MovieDetail />} />
      </Routes>
    </Router>
    )
}

export default AppRouter;