
import React, { Fragment, useState } from 'react';
import Headers from '../headers/Headers';
import Sidebar from '../sidebar/Sidebar';


const Layout = ( { children }) => {

    const [toggle, setToogle] = useState(true);

    const toogleMenu = () => {
        console.log(" layout "+toggle);
        setToogle(!toggle)
    }

    return (
        <Fragment>
            <Headers isToogle={toogleMenu} /> 
            <Sidebar sidebar={toggle} />
            <div className={toggle ? 'app-content': 'app-content active'}>
                { children }
            </div>
        </Fragment>
    )
}


export default Layout;
