import React from 'react';
import Layout from '../components/layout/Layout';
import { Outlet } from 'react-router-dom';

const Rotas = () => {
    return (
        <Layout>
            { <Outlet/> }
        </Layout>    

    )
}

export default Rotas;