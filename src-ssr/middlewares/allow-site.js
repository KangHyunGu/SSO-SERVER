import { ssrMiddleware } from 'quasar/wrappers'
import authCtrl from 'src-ssr/controller/authCtrl';
import allowSiteCtrl from 'src-ssr/controller/allowSiteCtrl';

export default ssrMiddleware(({ app, resolve, render, serve }) => {
	app.get('/api/adm/allowtest', authCtrl.isAdmin, allowSiteCtrl.test); // 테스트
	app.get('/api/adm/allow', authCtrl.isAdmin, allowSiteCtrl.list)  //목록
	app.post('/api/adm/allow', authCtrl.isAdmin, allowSiteCtrl.create) // 생성
	app.put('/api/adm/allow/:id', authCtrl.isAdmin, allowSiteCtrl.update) // 수정
	app.delete('/api/adm/allow/:id', authCtrl.isAdmin, allowSiteCtrl.remove); // 삭제
})