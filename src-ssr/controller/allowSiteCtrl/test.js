import getEncodeId from 'src-ssr/lib/getEncodedId';

async function insert(len) {
	let query = `INSERT INTO allowSite (appName, siteUrl, allowed, appToken, createdAt, updatedAt) values `;
	const arr = [];
	for (let i = 1; i <= len; i++) {
		arr.push(`('app ${i}', 'C${i}.sso.com', '${i % 2 ? 'Y' : 'N'}', '${getEncodeId()}', NOW(), NOW())`);
	}
	query = query + arr.join(', ');
	const rows = await $DB.sequelize.query(query);
	return rows;
}

export default async (req, res, next) => {
	try {
		await $DB.sequelize.query('TRUNCATE allowSite');
		const data = await insert(100);
		res.json({
			success: true,
			data,
		})
	} catch (e) {
		res.json({
			success: true,
			data: e.message,
		})
	}
}