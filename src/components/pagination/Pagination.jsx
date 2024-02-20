import React, { Fragment, useState } from 'react'
import * as FaIcons from 'react-icons/fa';

const Pagination = ({ 
    page,
    pageSize,
    totalPages,
    totalElements, 
    changePage }) => {


    console.log(page);
    const [currentPage, setCurrentPage] = useState(
        page <= totalPages ? page + 1 : 1
    );
    
    const pages = [];

    let ellipsisLeft = false;
    let ellipsisRight = false;


    const onChangePage = (pagina, e)=>{
        e.preventDefault();
        setCurrentPage(pagina);
        changePage(pagina);
    } 


    for (let i = 1; i <= totalPages; i++){
        if (i === currentPage ){
            pages.push({
                id:i,
                current:true,
                ellipsis:false
            });
        } else if ( i < 2 || i > totalPages - 1 || i === currentPage - 1 || i === currentPage + 1 ){
            pages.push({
                id:i,
                current:true,
                ellipsis:false,
            });
        } else if ( i > 1 &&  i < currentPage && !ellipsisLeft ){
            pages.push({
                id:i,
                current:false,
                ellipsis:true,
            })
            ellipsisLeft = true;
        } else if ( i < totalPages && (i>currentPage) && !ellipsisRight ){
            pages.push({
                id:i,
                current:false,
                ellipsis:true,
            })
            ellipsisRight = true;
        }

    }

  return (
    <Fragment>
        <div className='box-footer clear-fix'>
            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-5'>
                    <div className='pagination'>
                        <div className='app-label'>
                            Mostrando &nbsp;&nbsp; 
                            <span className='badge bg-secondary'>
                                {pageSize * page + 1}
                            </span>
                            &nbsp;&nbsp; de &nbsp;&nbsp;
                            <span className='badge bg-secondary'>
                                { Math.ceil( totalElements / pageSize) }
                            </span>
                            &nbsp;&nbsp; Páginas de &nbsp;&nbsp;
                            <span className='badge bg-secondary'>
                                { totalPages }
                            </span>
                            &nbsp;&nbsp; Registros cadastrados
                        </div>
                    </div>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-7'>
                    <nav className='Page navigation'>
                        <ul className='pagination pagination-lg justify-content-end'>
                            <li className={ page === 0 ? "page-item disabled" : "page-item"} >
                                <button 
                                   className='page-link btn btn-sm'
                                   onClick={(e) => onChangePage(1,e)}
                                   title="Primeiro" 
                                 >
                                 <i><FaIcons.FaAngleLeft/></i>   
                                </button>
                            </li>
                            <li className={ page === 0 ? "page-item disabled" : "page-item"} >
                                <button 
                                   className='page-link btn btn-sm'
                                   onClick={(e) => onChangePage(currentPage === 0 ? currentPage : currentPage - 1,e)}
                                   title="Anterior" 
                                 >
                                <i><FaIcons.FaAngleDoubleLeft/></i>
                                </button>
                              
                            </li>
                            {
                                pages.map((page)=>{
                                    if (!page.ellipsis){
                                        return (
                                            <li key={page.id}
                                                className={page + 1 === page.id ? "page-item active": "page-item"} 
                                            >
                                            <a href="/#" className='page-link'
                                               onClick={(e)=>onChangePage(page.id, e)}>{page.id}</a>   
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page.id}>
                                                <span className='ellipsis'>&hellip;</span>
                                            </li>
                                        )
                                    }
                                })
                            }
                            <li className={ page === totalPages ? "page-item disabled" : "page-item "} >
                                <button 
                                   className='page-link btn btn-sm'
                                   onClick={(e) => onChangePage(currentPage + 1,e)}
                                   title="Próximo" 
                                 >
                                <i><FaIcons.FaAngleDoubleRight /></i>
                                </button>
                                
                            </li>
                            <li className={ page === totalPages ? "page-item disabled" : "page-item"} >
                                <button 
                                   className='page-link btn btn-sm'
                                   onClick={(e) => onChangePage(totalPages,e)}
                                   title="Primeiro" 
                                 >
                                 <i><FaIcons.FaAngleRight/></i>   
                                </button>
                            </li>

                        </ul>

                    </nav>

                </div>
            </div>
        </div>

    </Fragment>
  )
}

export default Pagination;