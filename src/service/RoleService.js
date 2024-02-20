
import http from '../config/http';

export const listagemRoles = async () => {
    return (
        http({
            method:'GET',
            url:'/role/listar',
        }).then( ( response ) =>{
            return response;
        })   
    )   
}