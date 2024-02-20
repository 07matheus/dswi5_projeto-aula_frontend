import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import ShowMensagem from '../../components/mensagens/ShowMensagem';
import { listagemRoles } from '../../service/RoleService'; 
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import { BUTTON_SIZE_SHOW_MESSAGE } from '../../config/config';
import { useState } from 'react';
import ShowError from '../../components/mensagens/ShowError';
import { lerUsuarioRolesPorId } from '../../service/UsuarioService';

const ManutencaoRole = () => {
    const { id } = useParams();
    
    const [roles, setRoles ] = useState([]);
    const [usuario, setUsuario] = useState([]);

   useEffect(()=>{

    async function loadusuarioRolesPorId(){
        const response = await lerUsuarioRolesPorId(id)
        .catch((error)=>{
            ShowError(error.code);
        })
        console.log(response);
        const { objeto } = response.data;
        setUsuario({...usuario,
            id:objeto.id,
            username:objeto.username,
            roles:objeto.roles
        });
    }


    loadusuarioRolesPorId()

   },[id]); 

   useEffect(()=>{

     async function loadRoleFromApi(){
         let role = []; 
         const response = await listagemRoles()
         .catch((error)=>{
            ShowError(error.code);
         });
         
         console.log(response.data);

         const { data } = response;

         for (let i = 0; i < data.length; i++  ){
             role.push({
                id:data[i].id,
                nome:data[i].nome,
                check:false,
             })
         }

         for (let i = 0; i < role.length; i++ ){
            for (let j = 0; j < usuario.roles.length; j++ ){
                 if (role[i].id === usuario.roles[j].id){
                     role[i].check=true;
                 }
            }
            
         } 
          
         

         setRoles(role);

     }  
      

     loadRoleFromApi(); 
   },[]); 

  const onChangeAtivarDesativarDireito = (e, index) => {
     console.log(e + index);
  }

  return (
    <Fragment>
    <ShowMensagem
      iconTitulo={<FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE}/>}
      titulo="Manutenção dos Direitos de Acesso dos Usuários"
      descricao="Listar os direitos de acesso do usuários"
      iconReturn={<AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE}/>}
      url="/usuario/listar" 
      tituloUrl="Listagem de Usuários" 
    />


    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12">
        <div className="app-windows">
          <div className="row mb-3">
           <label htmlFor="key" className="col-form-label">
                Usuário:
            </label>
             <div className="col-xs-11 col-sm-11 col-md-6">
                <input
                  type="text"
                  name="nome"
                  defaultValue={usuario.username}
                  className="form-control"
                />
             </div>
           </div>     
          <div className="row justify-content-center">
            <form>
              <div className="row mb-3">
                <label htmlFor="key" className="col-form-label">
                  Filtro:
                </label>
                <div className="col-xs-11 col-sm-11 col-md-6">
                  <input
                    type="text"
                    id="key"
                    name="key"
                    className="form-control"
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <button
                    type="submit"
                    className="btn btn-success form-control"
                  >
                    Consulta
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <table className="table table-striped table-bordered table-hover app-tabela">
              <thead>
              <tr className="bg-success text-white app-cabecalho-tabela">
                <th>Id</th>
                <th>Nome</th>
                <th>Ativo</th>
              </tr>
              </thead>
              <tbody>
                { 
                    roles && 
                       roles.map( ( role, index ) => (
                      <tr className="app-coluna-detalhe-centro" key={index}>
                      <td>{ role.id }</td>
                      <td>{ role.nome }</td>
                      <td>
                        <input
                          type="checkbox"
                          className="btn-check"
                          name={`check_${role.id}`}
                          id={`check_${role.id}`}
                          autoComplete="off"
                          checked={role.check} 
                          value={role.id}
                          onChange={(e) => onChangeAtivarDesativarDireito(e, index)}
                        />
                        { role.check ? (
                          <label
                              className="btn btn-outline-success"
                              htmlFor={`check_${ role.id }`}
                            >
                            <i><BsIcons.BsPersonFillCheck/></i>
                          </label>
                        ) : (
                          <label
                              className="btn btn-outline-warning"
                              htmlFor={`check_${ role.id }`}
                          >
                          <i><BsIcons.BsPersonFillLock/></i>
                        </label>   
                        )}

                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Link to="#" type="button" className="btn btn-primary btn-lg">
               Salvar Cadastrar &nbsp;&nbsp;
               <i><FaIcons.FaSave/></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
  )
}

export default ManutencaoRole