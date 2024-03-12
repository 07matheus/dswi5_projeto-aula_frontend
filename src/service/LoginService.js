import http from '../config/http';

const loginUsuario = async ( login ) => {
  return (
      http({
        method:'POST',
        url: '/login',
        data: login
      }).then((response) =>{
        return response;
      })
  )
}

const refreshTokenService = async (accessToken, refreshToken) => {
  return (
    http({
      method: "POST",
      url: "/refreshToken",
      data: { accessToken, refreshToken }
    }).then(response => {
      return response;
    })
  )
}

export {
  loginUsuario,
  refreshTokenService
}