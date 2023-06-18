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

	},
	actions: {
		async socketLogin({member, token}) {
			this.member = member;
			this.accToken = token;
			authApi.setHeaderToken(token)
		},
		async loginLocal(form) {
			const data = await authApi.login(form);
			if (data) {
				this.socketLogin(data);
				socket.emit('sso:login', this.socketId, this.accToken);
			}
			return data;
		}
	},
});
