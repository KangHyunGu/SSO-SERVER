<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import useSocketListener from 'src/composables/useSocketListener';
import { socket } from 'boot/socket';
import useUser from 'stores/useUser';
export default defineComponent({
  name: 'App',
	setup() {
		const userStore = useUser();
		useSocketListener(socket, {
			'sso:login': (data)=> {
				// console.log('sso:login', data);
				userStore.socketLogin(data);
			}
		})
	}
})
</script>
