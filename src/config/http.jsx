
import axios from 'axios';
import { SERVIDOR } from './config';
//import {toast} from "react-toastify"

const http = axios.create({
    baseURL:SERVIDOR,
})

http.interceptors.request.use(function(config) {
    return Promise.resolve(config);
  }, function(error){
     return Promise.reject(error);
});
  
http.interceptors.response.use(function(response){
      return response;
}, function (error) {
     return Promise.reject(error);
});




export default http;