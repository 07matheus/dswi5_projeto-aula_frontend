import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { BUTTON_SIZE, BUTTON_SIZE_SHOW_MESSAGE, DEFAULT_IMAGEM, SERVIDOR_GET_IMAGEM } from "../../config/config";

const Status = ({ showModal, closeModal }) => {
const [foto, setFoto] = useState(null); 

const closeStatus = () => {
    closeModal(false);
  }
  
  
  return (
    <Fragment>
      <Modal 
      show={showModal}
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="app-windows">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-4">
                 <div className="card">
                   <div className="card-body">
                       <div className="d-flex flex-column align-items-center text-center">
                             
                          <img src={ foto===null
                               ? DEFAULT_IMAGEM
                               : `${SERVIDOR_GET_IMAGEM}${foto}`  
                             } alt="foto do usuário"
                           /> 
                           <div className="mt-3 col-xs-12 col-sm-12 col-md-10">
                              <div className="fileInput">
                                 <input 
                                    type="file"
                                    onChange="selecionaArquivo"
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
                <form className="mt-3">
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
                          className="form-control"
                        />
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
                          className="form-control"
                        />
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
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="confirmPassword"
                          className="control-label"
                        >
                          Confirmar Senha:
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-success btn-lg">
                       Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeStatus}>Close</Button>
      </Modal.Footer>
    </Modal>
    </Fragment>
  );
};

export default Status;
