import http from "../config/http";

export const postFoto = async ( formData ) => {
    return(
        http({
            method:"POST",
            url:"/foto/salvar",
            data:formData,
            headers:{
                'Content-Type':'multipart/form-data',
            }
        }).then((response)=>{
            return response;
        })
    )

}

export const deleteFoto = async ( formData ) => {
    return(
        http({
            method:"DELETE",
            url:"/foto/excluir",
            data:formData,
            headers:{
                'Content-Type':'multipart/form-data',
            }
        }).then((response)=>{
            return response;
        })
    )

}