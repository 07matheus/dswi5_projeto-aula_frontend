import React, { Fragment, useRef, useState } from "react";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { BUTTON_SIZE, BUTTON_SIZE_SHOW_MESSAGE, DEFAULT_IMAGEM, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_OK, HTTP_STATUS_PRECONDITION_FAILED, SERVIDOR_GET_IMAGEM } from "../../config/config";
import { Link } from "react-router-dom";
import { ERRORS, USUARIO } from "./Usuario";
import { incluirUsuario } from "../../service/UsuarioService";
import ShowError from "../../components/mensagens/ShowError";
import Mensagem from "../../components/mensagens/Mensagem";
import useValidationFormUsuario from "../../hook/useValidationFormUsuario";
import Alert from "../../components/mensagens/Alert";
import { deleteFoto, postFoto } from "../../service/FotoService";

const Incluir = () => {

    const { 
      usuario, 
      setUsuario, 
      errors, 
      setErrors, 
      isValid,
      validateAll,
      validBlurInput,
      isFormValid,
      validarUsuarioFromServer,
    } = useValidationFormUsuario(USUARIO, ERRORS);   

    const [foto, setFoto] = useState(null);
    const [show, setShow ] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [tipo, setTipo] = useState('');

    const uploadImage = useRef(null);
    const nomeFoto = useRef(null);
    const contentType = useRef(null);
   
    const onSubmitData = async (e) =>{
        e.preventDefault();
        let erros = validateAll();
        if (isValid(erros)){
           const response = await incluirUsuario(usuario)
            .catch((error)=> {
            ShowError(error.code) 
            const { status, mensagem } = error.response;
            if ( status === HTTP_STATUS_BAD_REQUEST ){
              showMensagem("danger", mensagem, true);
            } else if (status === HTTP_STATUS_PRECONDITION_FAILED){
              showMensagem("danger",mensagem, true);
              erros = validarUsuarioFromServer(error.response.data.fields);
              setErrors(...erros);
            } else {
              showMensagem("danger", mensagem, true);
            }
        });
        const { status, mensagem } = response.data;
        if (status === HTTP_STATUS_CREATED){
            showMensagem("success",mensagem, true);
            setUsuario(USUARIO);
        } 
     } else {
        showMensagem("danger",'Informe os dados do usuário corretamente!', true);
        setErrors({ ...erros});
     }
  
    }

    const handleBlurUsuarioDate = (e) => {
        const { currentTarget: input } = e;
        let erros = validBlurInput(input.name);
        if (!isValid(erros)){
          setErrors({...erros})
          showMensagem("danger",'Informe os dados do usuário corretamente!', true );
        }
    }

    const handleChangeUsuario = (e) => {
        const { name, value } = e.target;
        setUsuario({
          ...usuario,
          [name]:value
        })
    } 


    const selecionaArquivo = async (e) => {
      e.preventDefault();
      const [file] = e.target.files;
      if (file){
        const reader = new FileReader();
        const { current } = uploadImage;
        current.file = file;
        reader.onload = (e) => {
          current.src = e.target.file
        };
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append("id","0");
        formData.append("foto", file);
        const response = await postFoto(formData)
        .catch((error)=>{
          ShowError(error.code);
          const { status, mensagem } = error.response;
          if ( status === HTTP_STATUS_BAD_REQUEST ){
              showMensagem("danger", mensagem, true);
          } else {
              showMensagem("danger", mensagem, true);
          }
        });
        const { status, mensagem } = response.data; 
        if ( status === HTTP_STATUS_CREATED){
            setFoto(response.data.objeto.nomeArquivo);
            contentType.current.value = response.data.objeto.contentType;
            nomeFoto.current.value = response.data.objeto.noemeArquivo;
            showMensagem("success",mensagem, true);
        }
      } 
    }

  const excluirFoto = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append("id","0");
      formData.append("nomeArquivo", foto);
      const response =  await deleteFoto(formData)
      .catch((error)=>{
        ShowError(error.code)
        const { status, mensagem } = error.response;
          if ( status === HTTP_STATUS_BAD_REQUEST ){
              showMensagem("danger", mensagem, true);
          } else {
              showMensagem("danger", mensagem, true);
          }
      });
      const { status, mensagem } = response.data; 
      if ( status === HTTP_STATUS_CREATED){
           setFoto(null);
           contentType.current.value = "";
           nomeFoto.current.value = "";
           uploadImage.current.value=null;
           showMensagem("success",mensagem, true);
      }
    }


  const closeMensagem = () =>{
    setShow(false);
    setTipo('');
    setMensagem('');
    setErrors(ERRORS);
  }  

  const showMensagem = (tipo, mensagem, show) => {
    setShow(show);
    setTipo(tipo);
    setMensagem(mensagem);
  } 



  return (
    <Fragment>
      <ShowMensagem
        iconTitulo={<FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />}
        titulo="Cadastro de Usuários"
        descricao="Incluir novo usuário no sistema"
        iconReturn={<MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />}
        caminho="Usuário"
        url="/usuario/listar"
        tituloUrl="Listagem de Usuários"
      />
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
          <div className="app-windows">
            {
              show && (
                <Alert
                  mensagem={mensagem}
                  show={show}
                  tipo={tipo}
                  closeMensagem={()=>closeMensagem()}
                />  
              )
            }
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-4">
                 <div className="card">
                   <div className="card-body">
                       <div className="d-flex flex-column align-items-center text-center">
                             
                          <img 
                            src={ foto===null
                               ? DEFAULT_IMAGEM
                               : `${SERVIDOR_GET_IMAGEM}${foto}`  
                            } 
                            alt="foto do usuário"
                            ref={uploadImage}
                            onClick={excluirFoto}
                           /> 
                           <div className="mt-3 col-xs-12 col-sm-12 col-md-10">
                              <div className="fileInput">
                                 <input 
                                    type="hidden"
                                    id="foto"
                                    name="foto"
                                    ref={nomeFoto}/>  
                                 <input 
                                    type="hidden"
                                    id="contentType"
                                    name="contentType"
                                    ref={contentType}/>  
                                
                                 <input 
                                    type="file"
                                    ref={uploadImage}
                                    onChange={selecionaArquivo}
                                 />
                                 <button 
                                    id="upload"
                                    className="btn btn-success btn-lg upload"
                                    title="Enviar foto do usuário para o servidor"
                                    >
                                    <i>
                                     <FaIcons.FaUpload size={BUTTON_SIZE} />
                                    </i>    

                                 </button>  
                              
                              </div> 
                            
                            </div> 
                        </div> 

                   </div>
                 </div>   

              </div>
              <div className="col-xs-12 col-sm-12 col-md-8">
                <form className="mt-3" onSubmit={onSubmitData}>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="username" className="control-label">
                          Nome:
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className={
                            errors.username 
                               ? "form-control is-invalid"
                               : "form-control"
                          }
                          value={usuario.username}
                          onChange={handleChangeUsuario}
                          onBlur={handleBlurUsuarioDate}
                        />
                        {
                          errors.username 
                              ? ( <Mensagem mensagem={errors.username}/> ) 
                              : ( null )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="email" className="control-label">
                          E-mail:
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className={
                            errors.email 
                               ? "form-control is-invalid"
                               : "form-control"
                          }
                          value={usuario.email}
                          onChange={handleChangeUsuario}
                          onBlur={handleBlurUsuarioDate}
                        />
                         {
                           errors.email 
                              ? ( <Mensagem mensagem={errors.email}/> ) 
                              : ( null )
                          }
                        
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="password" className="control-label">
                          Senha:
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className={
                            errors.password 
                               ? "form-control is-invalid"
                               : "form-control"
                          }
                          value={usuario.password}
                          onChange={handleChangeUsuario}
                          onBlur={handleBlurUsuarioDate}
                        />
                         {
                           errors.password 
                              ? ( <Mensagem mensagem={errors.password}/> ) 
                              : ( null )
                         }
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="confirmePassword"
                          className="control-label"
                        >
                          Confirmar Senha:
                        </label>
                        <input
                          type="password"
                          id="confirmePassword"
                          name="confirmePassword"
                          className={
                            errors.confirmePassword 
                               ? "form-control is-invalid"
                               : "form-control"
                          }
                          value={usuario.confirmePassword}
                          onChange={handleChangeUsuario}
                          onBlur={handleBlurUsuarioDate}
                        />
                         {
                           errors.confirmePassword 
                              ? ( <Mensagem mensagem={errors.confirmePassword}/> ) 
                              : ( null )
                         }
                      </div>
                    </div>
                  </div>
                  <div>
                    <button type="submit" 
                            className="btn btn-success btn-lg"
                            disabled={!isFormValid()}>
                      Salvar
                    </button>
                    <Link
                      to="/usuario/listar"
                      type="button"
                      className="btn btn-warning btn-lg"
                    >
                      Cancelar
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Incluir;
