
import http from '../config/http';

const listagemUsuarios = async () => {
    return (
        http({
            method:'GET',
            url:'/usuario/listar',
        }).then( ( response ) =>{
            return response?.data
        })   
    )   
}

const listagemUsuariosPorNome = async (key, page, pageSize, dir, props) => {
    return (
        http({
            method:'GET',
            url:'/usuario/listaPaginadaPorNome',
            params:{
                key,
                page,
                pageSize,
                dir,
                props
            }
        }).then( ( response ) =>{
            return response?.data
        })   
    )   
}


const lerUsuarioPorId = async (id) => {
    return (
        http({
            method:'GET',
            url: `/usuario/buscar/${id}`,
        }).then( ( response ) =>{
            return response?.data
        })  
    )   
}

const lerUsuarioRolesPorId = async (id) => {
    return (
        http({
            method:'GET',
            url: `/usuario/${id}/roles`,
        }).then( ( response ) =>{
            return response;
        })  
    )   
}


const incluirUsuario = async (usuario) => {
    return (
        http({
            method:'POST',
            url: '/usuario/salvar',
            data:usuario
        }).then((response) =>{
            return response;
        })
    )
}


export {
    listagemUsuarios,
    listagemUsuariosPorNome,
    lerUsuarioPorId,
    lerUsuarioRolesPorId,
    incluirUsuario,
}