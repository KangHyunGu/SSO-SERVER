export default async (req, res, next) => {
	const { id } = req.params;
	const { appName, siteUrl, allowed } = req.body;

	try {
		if (isNaN(Number(id))) {
			throw new Error('올바른 ID가 아닙니다.');
		}

		if (!(appName || siteUrl || allowed)) {
			throw new Error('수정항목이 없습니다.');
		}

		const [updateCnt] = await $DB.allowSite.update({
			appName, siteUrl, allowed
		}, {
			where: { id }
		});
		res.json({
			success: true,
			data: updateCnt == 1,
		});
	} catch (e) {
		res.json({
			success: false,
			data: e.message,
		});
	}
}