import { Op } from 'sequelize';
import transLimit from 'src-ssr/lib/transLimit';

export default async (req, res, next) => {
	try {
		// console.log(req.query);
		const page = Number(req.query.page) || 1;
		const rowsPerPage = Number(req.query.rowsPerPage) || 10;
		const descending = req.query.descending ? req.query.descending == 'true' : true;
		const sortBy = req.query.sortBy;
		const search = req.query.search;

		let where = {};
		if (search) {
			where[Op.or] = [
				{ appName: { [Op.like]: `%${search}%` } },
				{ siteUrl: { [Op.like]: `%${search}%` } },
			];
		}

		let order = [];
		if (sortBy) {
			order.push([sortBy, descending ? 'ASC' : 'DESC']);
		}
		// console.log(sortBy, 'order', order);

		const data = await $DB.allowSite.findAndCountAll({
			where,
			order,
			...transLimit(page, rowsPerPage),
		});

		res.json({
			success: true,
			data,
		});
	} catch (e) {
		res.json({
			success: false,
			data: e.message,
		});
	}
}