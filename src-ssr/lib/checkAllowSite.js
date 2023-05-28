export default async (siteUrl, appToken) => {
	const where = {
		siteUrl,
		appToken,
		allowed: 'Y'
	}
	const site = await $DB.allowSite.findOne({ where });
	return site;
}