import React, { Fragment, useState } from 'react';
import * as Faicons from 'react-icons/fa';
import { USER_PHOTO } from '../../config/config';

const Headers = ({ isToogle }) => {
    
   const [toggle, setToogle] = useState(false);

   const toggleClick = () => {
      console.log(" header "+toggle);
      setToogle(!toggle);
      isToogle(toggle);
   }


   return (
     <Fragment>
        <header className="app-header">
            <div className="app-leftarea">
               Sistema<span>Controle</span> 
            </div>
            <div className="app-toggle">
                 <i><Faicons.FaBars
                       onClick={()=>toggleClick()} 
                    /></i>
            </div>
            <div className="app-profile">
                <img src={USER_PHOTO} alt="foto do usuário"/>
                <span>Cocão da Silva</span>
                <div className='app-logout'>
                <i><Faicons.FaSignOutAlt/></i> 
                </div>
            </div>



        </header>
     </Fragment>
   )
}

export default Headers;