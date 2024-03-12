import React from 'react';
import Layout from '../components/layout/Layout';
import { Navigate, Outlet } from 'react-router-dom';
import useLogin from '../hook/useLogin';

const PrivateRoute = () => {
  let { getUsuarioLogado } = useLogin();

  return (
    getUsuarioLogado() ? (
      <Layout>
        { <Outlet /> }
      </Layout>
    ): (
      <Navigate to={ '/login' } />
    )
  )
}

export default PrivateRoute;