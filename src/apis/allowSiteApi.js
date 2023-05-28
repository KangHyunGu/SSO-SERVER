import { ssoServer, axios } from 'boot/axios';

const URL = '/api/adm/allow';

const insert = async (form) => {
	const data = await ssoServer.post(URL, form)
	return data;
}

const update = async (id, form) => {
	const data = await ssoServer.put(`${URL}/${id}`, form,)
	return data;
}

const remove = async (id) => {
	const data = await ssoServer.delete(`${URL}/${id}`)
	return data;
}

const list = async (params) => {
	const data = await ssoServer.get(URL, { params })
	return data;
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

const test = async () => {
	try {
		const data = await ssoServer.get(`${URL}test`);
		return data;
	} catch (e) {
		console.error(e);
		return e
	}
}

export default {
	insert, update, remove, list,
	columns, defaultPagination,
	test,
}