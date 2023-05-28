import URL from 'url'
import checkAllowSite from '../lib/checkAllowSite';
export default async(req, res, next) => {
  try {
    const {serviceURL, appToken} = req.query;
    if(!serviceURL || !appToken){
      throw new Error('Service App가 아닙니다.');
    }

    const url = URL.parse(serviceURL);
    const allowSite = await checkAllowSite(url.hostname, appToken);
    console.log('allowSite : ', allowSite);
    if(!allowSite){
      throw new Error('허용되지 않는 앱 입니다.');
    }

    if(serviceURL.includes('?')) {
      res.redirect(`${serviceURL}&socketId=${req.session.socketId}`);
    } else {
      res.redirect(`${serviceURL}?socketId=${req.session.socketId}`);
    }

  }catch(e) {
    res.json({
      success: false,
      data : e.message
    })
  }
}
