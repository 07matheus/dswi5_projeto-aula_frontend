
import React, { Fragment, useState } from 'react';

const pagina = [5,10,15,20];


const SelectNumberPages = ({ pageSize, changePageSize }) => {

    const [tamanhoDaPagina, setTamanhoPagina] = useState(pageSize);

    const setPagina = ( tamanho ) => {
        setTamanhoPagina(tamanho);
        changePageSize(tamanho);
    }


    return (
        <Fragment>
            <label className='col-form-label col-sm-2'>Show:</label>
            <div className='input-group col-sm-6'>
                <select 
                  className='form-control form-select'
                  onChange={(e)=>setPagina(e.target.value)}
                  value={tamanhoDaPagina}                  
                >
                {
                    pagina.map((size)=>(
                        <option key={size} 
                                value={size}
                        >
                        {size}
                        </option>
                    ))
                }   
                </select>
                <div className='input-group-append'>
                    <span className='mb-3'>
                       &nbsp;&nbsp;&nbsp;&nbsp;Registros 
                    </span>
                </div>    
            </div>
        </Fragment>
    )  


}

export default SelectNumberPages;