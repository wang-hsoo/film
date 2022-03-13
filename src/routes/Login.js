import { Link } from "react-router-dom";

function Login(){
    return(
        <div>
            <h2>Film</h2>
            <Link to = {"/"}>Back</Link>
            <form>
                <input type="text" placeholder="Id" />
                <input type="password" placeholder="Password" />
                <input type="submit" value ="Login"/>
                
            </form>
        </div>
    )
}

export default Login;