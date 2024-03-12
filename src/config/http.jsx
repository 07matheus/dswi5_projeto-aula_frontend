
import axios from 'axios';
import { SERVIDOR } from './config';
import { getAccessTokenStorage, getRefreshTokenStorage, setLogin } from '../service/StorageService';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { refreshTokenService } from '../service/LoginService';

let accessToken  = null;
let refreshToken = null;

const getToken = () => {
    accessToken  = getAccessTokenStorage() ? getAccessTokenStorage(): false;
    refreshToken = getRefreshTokenStorage() ? getRefreshTokenStorage(): false;
}

const http = axios.create({
    baseURL:SERVIDOR,
})

http.interceptors.request.use(async function(config) {
    config.headers["Accept"] = "application/json";
    
    getToken();
    if(accessToken) {
        const user                      = jwtDecode(accessToken);
        config.headers["Authorization"] = `Bearer ${ accessToken }`;

        if(user) {
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if(!isExpired) return config;

            config.headers["Authorization"] = `Bearer ${ refreshToken }`;
            const response = await refreshTokenService(accessToken, refreshToken);

            const { objeto } = response.data;

            setLogin(objeto);

            config.header["Authorization"] = `Bearer ${ objeto.access_token }`;
        } 
    }

    // return Promise.resolve(config);
    return config;
}, function(error){
    return Promise.reject(error);
});
  
http.interceptors.response.use(function(response){
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default http;