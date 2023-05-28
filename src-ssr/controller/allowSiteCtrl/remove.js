export default async (req, res, next) => {
	const { id } = req.params;
	try {
		if (isNaN(Number(id))) {
			throw new Error('올바른 ID가 아닙니다.');
		}

		const deleteCnt = await $DB.allowSite.destroy({
			where: { id }
		});

		res.json({
			success: true,
			data: deleteCnt == 1,
		});

	} catch (e) {
		res.json({
			success: false,
			data: e.message,
		});
	}
}