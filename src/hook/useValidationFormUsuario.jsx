import { useState } from "react";


const useValidationFormUsuario = (USUARIO, ERRORS) => {

    const [usuario, setUsuario] = useState(USUARIO);
    const [errors, setErrors] = useState(ERRORS);

    const isValid = ( erros ) => {
      let keys = Object.keys(erros);
      let count = keys.reduce((acc, curr) => 
                   erros[curr] ? acc + 1 : acc, 0)    
      return count === 0;             
    }

    const validateAll = () => {
        let { 
            username, 
            email, 
            password, 
            confirmePassword 
        } = usuario;

        let erros = {};

        erros.username = validarUserName(username);
        erros.email = validarEmail(email);
        erros.password = validarPassword(password);
        erros.confirmePassword = validarConfirmePassword(password, confirmePassword);
 
        return erros;
    } 

    const validBlurInput = ( field ) =>{
        let { 
            username, 
            email, 
            password, 
            confirmePassword
        } = usuario;

        let erros = errors;  

        switch(field){
            case "username":
                erros.usename = validarUserName(username)
                break;
            case "email" :
                erros.email = validarEmail(email)
                break;
            case "password" :
                erros.password = validarPassword(password)
                break;
            case "confirmePassword":
                erros.confirmePassword = validarConfirmePassword(password, confirmePassword)
                break;        
        }
        return erros;
    }

    const isFormValid = () => {
        let erros = validateAll();
        return isValid(erros);
    }


    const validarUserName = (username) => {
        return !username 
               ? "Obrigatório informar o nome do usuário"
               : username.length < 5
               ? "O nome do usuário não pode ser menor que cinco caracteres"
               : "";
    }

    const validarEmail = (email) => {
        return !new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi).test(email)
               ? "E-mail inválido "
               : "";  
    } 

    const validarPassword = (password) => {
        return !password 
               ? "A senha deve ser informada"
               : password.length < 6 
               ? "A senha deve conter seis ou mais caracteres"
               :""; 
    }

    const validarConfirmePassword = (password, confirmePassword) => {
        return !confirmePassword
               ? "A senha deve ser informada corretamente "
               : confirmePassword !== password
               ? "As senhas devem ser iguais "
               : "";
    }

    const validarUsuarioFromServer = ( fields ) => {
          let erros = errors;
          for (let i = 0; i < fields.length; i++ ){
            if (fields[i].nome === "username"){
                erros.username = fields[i].userMessage;
            }
            if (fields[i].nome === "email"){
                erros.email= fields[i].userMessage;
            }
            if (fields[i].nome === "password"){
                erros.password = fields[i].userMessage;
            }
            if (fields[i].nome === "confirmePassword"){
                erros.confirmePassword = fields[i].userMessage;
            }
          }
          return erros;
    } 





    return {
        usuario, 
        setUsuario,
        errors, 
        setErrors,
        isValid,
        validateAll,
        validBlurInput,
        isFormValid,
        validarUsuarioFromServer,
    }
}

export default useValidationFormUsuario;