import URL from 'url';
import checkAllowSite from 'src-ssr/lib/checkAllowSite';

export default async (req, res, next) => {
	try {
		const { serviceURL, appToken } = req.query;
		if (!serviceURL || !appToken) {
			throw new Error('Service App이 아닙니다.');
		}

		const url = URL.parse(serviceURL);
		const allowSite = await checkAllowSite(url.hostname, appToken);
		if (!allowSite) {
			throw new Error('허용되지 않은 앱입니다.');
		}

		if (serviceURL.includes('?')) {
			res.redirect(`${serviceURL}&socketId=${req.session.socketId}`);
		} else {
			res.redirect(`${serviceURL}?socketId=${req.session.socketId}`);
		}
	} catch (e) {
		res.json({
			success: false,
			data: e.message
		})
	}
}