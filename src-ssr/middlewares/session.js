import { ssrMiddleware } from 'quasar/wrappers'
import session from 'express-session';
import express from 'express';
import Config from '../../config'
import db from 'src-ssr/lib/ConnectSequelize';
import ConnectSession from 'connect-session-sequelize';
import getEncodedId from 'src-ssr/lib/getEncodedId';
import socketIdCtrl from '../controller/socketIdCtrl';

export default ssrMiddleware(async ({ app, port, resolve, publicPath, folders, render, serve }) => {
  const config = Config[process.env.NODE_ENV];
  // something to do
  // console.log('session middle ware run!!!!');
  // app.get('*', (req, res, next)=> {
  //   console.log("app get!!!");
  //   next();
  // })

  // 바디 파서
  app.use(express.json());
  app.use(express.urlencoded({extends: true}));

  global.$DB = db;
  //session 정보를 가지위한 설정
  const connectSession = ConnectSession(session.Store);
  //session DB 관리
  const mySqlStore = new connectSession({db : db.sequelize});

  app.use(session({
    key : 'connect.sid',
    secret: 'keyboard cat',
    store: mySqlStore,
    resave: false,
    saveUninitialized: true,
  }))

  db.sequelize.sync({
    // true ==> 실행 할때 자원이 없을 경우 자동으로 생성
    alter : process.env.NODE_ENV == 'development'
  });

  app.get('*', (req, res, next)=> {
    if(!req.session.socketId){
      req.session.socketId = getEncodedId();
      req.session.save();
      console.log('New Session Socket ID =>', req.session.socketId);
    }
    next();
  })

  app.get('/socketId', socketIdCtrl);
})
