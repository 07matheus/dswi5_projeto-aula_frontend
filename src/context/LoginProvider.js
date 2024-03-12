import { createContext } from "react"
import { setLogin, getLoginStorage, logoutSystem, getNomeUsuarioStorage, getAccessTokenStorage, getRefreshTokenStorage, getFotoUsuarioStorage } from "../service/StorageService";

export const LoginContexto = createContext(null);

export const LoginProviter = ({ children }) => {
  const loginSistema = ( usuario ) => {
    setLogin(usuario);
  }

  const getUsuarioLogado = () => {
    return getLoginStorage();
  }

  const logout = () => {
    return logoutSystem();
  }

  const getNomeUsuario = () => {
    return getNomeUsuarioStorage();
  }

  const getAccessToken = () => {
    return getAccessTokenStorage();
  }

  const getRefreshToken = () => {
    return getRefreshTokenStorage();
  }

  const getFotoUsuario = () => {
    return getFotoUsuarioStorage();
  }

  return (
    <LoginContexto.Provider 
      value={{ 
        loginSistema, 
        getUsuarioLogado, 
        logout,
        getNomeUsuario,
        getAccessToken,
        getRefreshToken,
        getFotoUsuario
      }}
    >
      { children }
    </LoginContexto.Provider>
  )
}