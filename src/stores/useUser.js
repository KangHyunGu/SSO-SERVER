import { defineStore } from 'pinia';
import authApi from 'src/apis/authApi';

export default defineStore('user', {
	state: ()=>({
		socketId : null,
    member: null,
    accToken : null,
	}),
	getters: {

	},
	actions: {

		async loginLocal(form) {
      const data = await authApi.login(form);
      if(data){
        this.member = data.member;
        this.accToken = data.accToken;
        authApi.setHeaderToken(data.token);
        // TODO: 소켓 로그인 완료
      }

      return data;
    }
	},
});
