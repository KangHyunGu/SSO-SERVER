import getEncodedId from 'src-ssr/lib/getEncodedId';

export default async (req, res, next) => {
	const { appName, siteUrl } = req.body;
	const allowed = req.body.allowed || 'Y';
	try {
		if(!appName || !siteUrl) {
			throw new Error('appName과 siteUrl은 필수 입력입니다.');
		}

		// app토큰 생성
		const appToken = getEncodedId();
		const data = await $DB.allowSite.create({
			appName, siteUrl, allowed, appToken
		});

		res.json({
			success : true,
			data,
		});
	} catch(e) {
		res.json({
			success : false,
			data : e.message,
		});
	}
}