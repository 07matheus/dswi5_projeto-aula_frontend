import { Fragment } from "react"
import { Link } from "react-router-dom";

const ShowItem = ({path,icon,page,index}) =>{
    return (
        <Fragment>
          <li className="list" >
              <Link to={path}>  
                  <i>{icon}</i>
                  <span className="link">{page}</span>
              </Link>
          </li>
        </Fragment>
    )
}


export default ShowItem;