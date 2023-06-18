import { defineStore } from 'pinia';
import authApi from 'src/apis/authApi';
import { socket } from 'boot/socket';

export default defineStore('user', {
	state: () => ({
		socketId: null,
		member: null,
		accToken: null,
	}),
	getters: {
    isLogin() {
      return !!this.member;
    }

	},
	actions: {
		async socketLogin({member, token}) {
			this.member = member;
			this.accToken = token;
			authApi.setHeaderToken(token)
		},
    async socketLogout() {
      this.member = null;
      this.accToken = null;
      // logout시 header에 발급 된 token 제거
      authApi.unsetHeaderToken();
    },
		async loginLocal(form) {
			const data = await authApi.login(form);
			if (data) {
				this.socketLogin(data);
				socket.emit('sso:login', this.socketId, this.accToken);
			}
			return data;
		},
    async logout(){
      const data = await authApi.logout(this.socketId);
      if(data) {
        this.socketLogout();
        // 소켓에 로그아웃 상황을 전파
        socket.emit('sso:logout', this.socketId);
      }
    }
	},
});
