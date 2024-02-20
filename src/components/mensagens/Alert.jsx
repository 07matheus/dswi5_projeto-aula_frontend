import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import checkIcon from "../../assets/icon/check.svg";
import errorIcon from "../../assets/icon/error.svg";
import infoIcon from "../../assets/icon/info.svg";
import warningIcon from "../../assets/icon/warning.svg";


const Alert = (props) => {
   const [showAlert, setShowAlert] = useState(true); 
   const { show, mensagem, closeMensagem, tipo } = props;  
   let icon = null;

   useEffect(()=>{
      const timeoutId = setTimeout(async()=>{
        close(false);
      },3000);
      return () => {
        clearTimeout(timeoutId);
      }  
   },[]); 

   const close = () => {
      setShowAlert(false);
      closeMensagem()
   }
   
   

   if (tipo==="success"){
      icon=checkIcon; 
   } else if (tipo==="danger"){
      icon=errorIcon;  
   } else if (tipo==="info"){
      icon=infoIcon;
   } else if (tipo==="warning"){
      icon=warningIcon;
   }


  return (
    <Fragment>
       {
         show && showAlert && (
            <div className={`alert alert-${tipo} alert-dismissible fade show role='alert'`}>
                <img src={icon} className="app-show-imagem" alt="icones de mensagens"/>
                <span>
                  <strong className='app-show-mensagem'>{mensagem}</strong>
                </span>    
                <span className="app-close-btn" onClick={()=>closeMensagem()}>
                    X
                </span>
            </div>
         )
       }
    </Fragment>
  )
}

export default Alert