import React, { Fragment, useState } from 'react';
import * as Faicons from 'react-icons/fa';
import { SERVIDOR_GET_IMAGEM, USER_PHOTO } from '../../config/config';
import useLogin from '../../hook/useLogin';
import { useNavigate } from 'react-router-dom';

const Headers = ({ isToogle }) => {
   const navigate            = useNavigate();
   const [toggle, setToogle] = useState(false);
   const { getAccessToken, getRefreshToken, getNomeUsuario, getFotoUsuario, logout } = useLogin();

   const toggleClick = () => {
      console.log(" header "+toggle);
      setToogle(!toggle);
      isToogle(toggle);
   }

   const sair = async () => {
      logout();
      navigate('/login');
   }

   const foto = getFotoUsuario();

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
               <img src={
                  foto === null ? USER_PHOTO: `${SERVIDOR_GET_IMAGEM}${foto}`
                } alt="foto do usuário"
               />
               <span> { getNomeUsuario() } </span>
               <div className='app-logout'>
               <i>
                  <Faicons.FaSignOutAlt onClick={ () => sair() }/>
               </i> 
               </div>
            </div>



        </header>
     </Fragment>
   )
}

export default Headers;