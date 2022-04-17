import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function MovieDetail(){
    const {title} = useParams();

    return(
        <div>
            <h3>{title}</h3>
            <Link to={`/`}>back</Link>
        </div>
    )
}

export default MovieDetail;