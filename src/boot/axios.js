import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Config from '../../config';
import {Notify} from 'quasar'

function interceptorRes(name, isDev = false) {
  return function(response) {
    let {data, status} = response;
    if(!data) {
      data = {
        success: true,
        data: response
      }
    }

    if(isDev) {
      console.log('AJAX ==> ', name, status, data);
    }

    try{
      if(status && status != 200){
        const message = `${name} AJAX Error : ${status}`;
        try {
          Notify.create({type: 'negative', message})
        } catch (e) {}
        throw new Error(message);
      }

      if(data && data.success) {
        return data.data;
      } else {
        const message = data.data;
        try {
          //SSR 일때 에러날수도 있으니 방지
          Notify.create({type: 'negative', message : message})
        } catch (e) {}
        throw new Error(message);
      }

    } catch(e) {
      if(isDev){
        console.error(e);
      }
      return false;
    }
  }

}

const isDev = process.env.NODE_ENV == 'development';
const config = isDev ? Config.development : Config.production;

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const ssoApi = axios.create({ baseURL: config.API_SERVER, withCredentials: true });
const ssoServer = axios.create({ baseURL: '', withCredentials: true });

 // intercepter 처리
 ssoApi.interceptors.response.use(interceptorRes('ssoApi', isDev));
 ssoServer.interceptors.response.use(interceptorRes('ssoServer', isDev));

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$ssoApi = ssoApi
  app.config.globalProperties.$ssoServer = ssoServer;
})

export { ssoApi, ssoServer, axios }
