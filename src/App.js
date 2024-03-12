import { Fragment } from 'react';
import './App.css';
import Rotas from './rotas/Rotas';
import { LoginProviter } from './context/LoginProvider';

function App() {
  return (
    <Fragment>
      <LoginProviter>
        <Rotas />
      </LoginProviter>
    </Fragment>
  );
}

export default App;
