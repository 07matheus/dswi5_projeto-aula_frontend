import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lerUsuarioRolePorId } from '../../service/UsuarioService';


const Alterar = () => {
    const { id } = useParams();

    useEffect(()=>{
        const loadUsuario = async () => {
            const response = await lerUsuarioRolePorId(id);
            console.log(response);

        }

        loadUsuario()
    },[]);
    



    return (
        <Fragment>
          <di>Show Alterar </di>
        </Fragment>
    )
}


export default Alterar;

