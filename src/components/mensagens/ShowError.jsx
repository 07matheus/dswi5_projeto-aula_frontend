
import { toast } from 'react-toastify';

const ShowError = (code) => {
    toast.error(getValidationError(code));
}


const getValidationError = (code) => {

    const errorCode = {
        ERR_NETWORK:"Sem rede para acesso",
        ERR_TIMEOUT:"Tempo de requisção esgotado",
        ERR_CANCEL:"Solicitação de cancelamento",
        ERR_UNKNOW:"Erro desconhecido",
        ERR_BAD_REQUEST:"Dados solicitados de forma incorreta",
        ERR_UNAUTHORIZED:"Acesso não autorizado",
        ERR_NOT_FOUND:"Recurso inexistente no servidor",
        ERR_SERVER_ERROR:"Erro de processamento servidor",
        ERR_CONNECTION_REFUSED:"Sem conexão com o servidor"
    }

    return (
        errorCode[code] 
           ? errorCode[code]
           : "Não foi possível processar a requisção"                 
  )
}

export default ShowError;