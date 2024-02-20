import React, { Fragment, useState } from "react";
import { BUTTON_SIZE_SHOW_MESSAGE, DEFAULT_IMAGEM_THUMBNAIL, SERVIDOR_GET_IMAGEM } from "../../config/config";
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import { useEffect } from "react";
import { listagemUsuariosPorNome } from "../../service/UsuarioService";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import Status from "./Status";
import { Link } from "react-router-dom";
import SelectNumberPages from "../../components/pagination/SelectNumberPage";
import Pagination from "../../components/pagination/Pagination";





const Listar = () => {

  const [usuarios, setUsuarios] = useState([])
  const [showModal, setShowModal] = useState(false);
  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [key, setKey] = useState('');
  const [dir, setDir ] = useState('asc');
  const [props, setProps] = useState('id');

  useEffect( () => {
    
    async function loadUsuario() {
        const response = await listagemUsuariosPorNome(key, page, pageSize, dir, props)
              .catch( ( error )=> {
                if (!error.response){
                   console.log(error.code);
                } else {

                }
                
              });
              if (typeof(response) != "undefined"){
                console.log(response);
                const { pageable, totalPages, totalElements, content } = response;
                setUsuarios(content); 
                setPage(pageable.pageNumber);
                setPageSize(pageable.pageSize);
                setTotalPages(totalPages);
                setTotalElements(totalElements);
              }
           
    }
    loadUsuario();

  },[key, page, pageSize, dir, props]) 
    
  

  const onShowModal = () => {
    setShowModal(true);
    console.log("valor do showmodal "+showModal)
  }
  
  const closeModal = () => {
    setShowModal(false);
  }


  const changePageSize = (tamanho) => {
    setPageSize(tamanho);
  }

  const onChangeKey = (nameKey) => {
    nameKey.trim().length > 0 ? setKey(nameKey) : setKey(''); 
  }


  const onSortProps = (e, atributo) => {
    e.preventDefault();
    const direcao = dir && dir === 'asc' ? 'desc':'asc';
    setDir(direcao);
    setProps(atributo);
  }

  const changePage = (pagina) => {
    setPage(pagina-1); 
  }


  return (
    <Fragment>
      <ShowMensagem
        iconTitulo={<FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE}/>}
        titulo="Manutenção de Usuários"
        descricao="Listar os usuários cadastrados no sistema"
        iconReturn={<AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE}/>}
        url="/dashboard" 
        tituloUrl="Dashboard" 
      />
      { showModal ? 
         (
          <Status 
            showModal={showModal}
            closeModal={closeModal}/>
         ) 
         : null}

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="app-windows">
            <div className="row justify-content-center">
              <form>
                <div className="row">
                  <div className="col-xs-12 col-sm-12m col-md-4">
                    <SelectNumberPages 
                      pageSize={pageSize}
                      changePageSize={(tamanho) => changePageSize(tamanho)}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-12m col-md-8">
                  <label htmlFor="key" className="col-form-label">
                    Filtro:
                  </label>
                  <div className="col-xs-11 col-sm-11 col-md-6">
                    <input
                      type="text"
                      id="key"
                      name="key"
                      className="form-control"
                      value={key}
                      onChange={(e)=>onChangeKey(e.target.value)}
                    />
                  </div>
                  {/* <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <button
                      type="submit"
                      className="btn btn-success form-control"
                    >
                      Consulta
                    </button>
                  </div> */}
                </div>
                </div>
              </form>
            </div>
            <div id="no_more_table">
              <table className="table table-striped table-bordered table-hover app-tabela cf">
                <thead className="cf">
                <tr>
                  <th className="bg-success text-white app-cabecalho-tabela">Foto</th>
                  <th className="bg-success text-white app-cabecalho-tabela">
                    <button className="btn btn-link text-white app-text-underline"
                      onClick={(e)=>onSortProps(e, 'id')} 
                     >
                      Id
                      {
                        props === 'id' && (
                          <i className={dir==='asc' ? (
                            <FaIcons.FaSortAlphaUp/>
                          ):(
                            <FaIcons.FaSortDown/>
                          )}></i>
                        )
                      }

                    </button>
                  </th>
                  <th className="bg-success text-white app-cabecalho-tabela">
                  <button className="btn btn-link text-white app-text-underline"
                      onClick={(e)=>onSortProps(e, 'id')} 
                     >
                      Nome
                      {
                        props === 'username' && (
                          <i className={dir==='asc' ? (
                            <FaIcons.FaSortAlphaUp/>
                          ):(
                            <FaIcons.FaSortDown/>
                          )}></i>
                        )
                      }

                    </button>
                  </th>
                  <th className="bg-success text-white app-cabecalho-tabela">
                  <button className="btn btn-link text-white app-text-underline"
                      onClick={(e)=>onSortProps(e, 'id')} 
                     >
                      E-mail
                      {
                        props === 'email' && (
                          <i className={dir==='asc' ? (
                            <FaIcons.FaSortAlphaUp/>
                          ):(
                            <FaIcons.FaSortDown/>
                          )}></i>
                        )
                      }

                    </button>

                  </th>
                  <th className="bg-success text-white app-cabecalho-tabela">Ativo</th>
                  <th className="bg-success text-white app-cabecalho-tabela">Ações</th>
                  <th className="bg-success text-white app-cabecalho-tabela">Direitos de Acesso</th>
                </tr>
                </thead>
                <tbody>
                  { 
                      usuarios && 
                         usuarios.map( ( usuario ) => (
                        <tr className="app-coluna-detalhe-centro" key={usuario.id}>
                          <td data-label="Foto">
                          <img
                            src={
                              usuario.foto === null
                                    ? DEFAULT_IMAGEM_THUMBNAIL
                                    : `${SERVIDOR_GET_IMAGEM}${usuario.foto}`
                            }
                            alt="foto usuário"
                            className="img-avatar"
                          />
                        </td>
                        <td data-label="Id">{ usuario.id }</td>
                        <td data-label="Nome">{ usuario.username }</td>
                        <td data-label="E-mail">{ usuario.email }</td>
                        <td data-labe="Ativo">
                          <input
                            type="checkbox"
                            className="btn-check"
                            name={`ativo_${usuario.id}`}
                            id={`ativo_${usuario.id}`}
                            autoComplete="off"
                            checked 
                            onChange={onShowModal}
                          />
                          { usuario.ativo ? (
                            <label
                                className="btn btn-outline-success"
                                htmlFor={`ativo_${usuario.id }`}
                              >
                              <i><BsIcons.BsPersonFillCheck/></i>
                            </label>
                          ) : (
                            <label
                                className="btn btn-outline-success"
                                htmlFor={`ativo_${usuario.id }`}
                            >
                            <i><BsIcons.BsPersonFillLock/></i>
                          </label>   
                          )}

                        </td>
                        <td data-label="Ações">
                          <a href="#" type="button" className="btn btn-secondary">
                            <i><FaIcons.FaPencilAlt/></i>
                          </a>
                          <a href="#" type="button" className="btn btn-danger">
                          <i><FaIcons.FaTrashAlt/></i>
                          </a>
                          <a href="#" type="button" className="btn btn-info">
                          <i><FaIcons.FaSearchPlus/></i>
                          </a>{" "}
                        </td>
                        <td data-label="Direitos de Acesso">
                        <Link to={`/role/adicionar/${usuario.id}`} type="button" className="btn btn-secondary">
                            <i><AiIcons.AiFillSecurityScan/></i>
                        </Link>
                        </td>
                      </tr>
                 
                 
                 
                    ))}
                    
                  
                </tbody>
              </table>
              { usuarios && (
                <Pagination 
                  page={page}
                  pageSize={pageSize}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  changePage = {(pagina) => changePage(pagina)}
                />
              )}
              <Link to="/usuario/incluir" type="button" className="btn btn-primary btn-lg">
                 Cadastrar novo usuário &nbsp;&nbsp;
                 <i><FaIcons.FaSave/></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Listar;
