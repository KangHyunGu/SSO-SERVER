import { ssoServer, axios } from 'boot/axios';

const URL = '/api/adm/allow';
const token = {
	insert: null,
	update: null,
	remove: null,
	list: null,
};

const insert = async (form) => {
	if (token.insert) {
		token.insert.cancel('AllowApi insert Cancel');
	}
	token.insert = axios.CancelToken.source();
	try {
		const data = await ssoServer.post(URL, form, {
			cancelToken: token.insert.token,
		})
		return data;
	} catch(e) {
		console.log(e.message);
		return false;
	}
}

const update = async (id, form) => {
	if (token.update) {
		token.update.cancel('AllowApi update Cancel');
	}
	token.update = axios.CancelToken.source();
	try {
		const data = await ssoServer.put(`${URL}/${id}`, form, {
			cancelToken: token.update.token,
		})
		return data;
	} catch(e) {
		console.log(e.message);
		return false;
	}
}

const remove = async (id) => {
	if (token.remove) {
		token.remove.cancel('AllowApi remove Cancel');
	}
	token.remove = axios.CancelToken.source();
	try {
		const data = await ssoServer.delete(`${URL}/${id}`, {
			cancelToken: token.remove.token,
		})
		return data;
	} catch(e) {
		console.log(e.message);
		return false;
	}
}

const list = async (params) => {
	if (token.list) {
		token.list.cancel('AllowApi list Cancel');
	}
	token.list = axios.CancelToken.source();
	try {
		const data = await ssoServer.get(URL, {
			params,
			cancelToken: token.list.token,
		})
		return data;
	} catch(e) {
		console.log(e.message);
		return false;
	}
}

const columns = [
	{ name: 'appName', label: 'APP', field: 'appName', sortable: true },
	{ name: 'siteUrl', label: 'URL', field: 'siteUrl', sortable: true },
	{ name: 'allowed', label: '허용여부', field: 'allowed', sortable: true },
	{ name: 'appToken', label: 'Token', field: 'appToken', sortable: false },
];

const defaultPagination = {
	sortBy: 'appName',
	descending: true,
	page: 1,
	rowsPerPage: 10,
	rowsNumber: 0,
	search: "",
}

const test = async() =>{
	try {
		const data = await ssoServer.get(`${URL}test`);
		return data;
	}catch(e) {
		console.error(e);
		return e
	}
}

export default {
	insert, update, remove, list,
	columns, defaultPagination,
	test,
}
