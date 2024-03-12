import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export function setLogin( usuario ) {
  sessionStorage.setItem(ACCESS_TOKEN, usuario.access_token);
  sessionStorage.setItem(REFRESH_TOKEN, usuario.refresh_token);
}

export function getAccessTokenStorage() {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
  return accessToken ?? null;
}

export function getRefreshTokenStorage() {
  const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
  return refreshToken ?? null;
}

export function getLoginStorage() {
  const accessToken = getAccessTokenStorage();
  return accessToken !== null;
}

export function getRefreshStorage() {
  const refreshToken = getRefreshTokenStorage();
  return refreshToken !== null;
}

export function logoutSystem() {
  sessionStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(REFRESH_TOKEN);
}

export function getNomeUsuarioStorage() {
  const accessToken = getAccessTokenStorage();
  const user        = jwtDecode(accessToken);

  return user.nome ?? null;
}

export function getFotoUsuarioStorage() {
  const accessToken = getAccessTokenStorage();
  const user        = jwtDecode(accessToken);

  return user.foto ?? null;
}