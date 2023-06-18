import { ssoApi, ssoServer } from 'boot/axios'

const URL = `/auth`;

// 생성 된 토큰 hedaer에 저장
const setHeaderToken = (token) => {
  ssoServer.defaults.headers.common['Authorization'] = 'bearer ' + token;
  ssoApi.defaults.headers.common['Authorization'] = 'bearer ' + token;
}

// header에 등록 된 토큰 제거
const unsetHeaderToken = () => {
  delete ssoServer.defaults.headers.common['Authorization'];
  delete ssoApi.defaults.headers.common['Authorization'];
}

const join = async(form) => {
	return await ssoApi.post(`${URL}/join`, form);
}

const login = async(form) => {
  return await ssoApi.post(`${URL}/login`, form);
}

const logout = async(socketId) => {
  return await ssoApi.post(`${URL}/logout`, {socketId})
}

export default {
	join, login, logout,
  setHeaderToken,
  unsetHeaderToken
}
