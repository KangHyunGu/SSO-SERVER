//해당 요청한 서버 사이트에 호스트와 도메인이 등록되어 있는지 체크
export default async (siteUrl, appToken) =>{
  const where = {
    siteUrl,
    appToken,
    allowed: 'Y',
  }
  // SSO-SERVER에서 해당 서비스 URL이 등록되어 있는지 확인
  const site = await $DB.allowSite.findOne({where});
  return site;
}
