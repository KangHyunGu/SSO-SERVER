// 운영 환경
const production = {
  API_SERVER : 'http://sso.bnb.com:20200',
  SESSION_DB : {
    host : 'localhost',
    port : 3306,
    user : 'bnbsso',
    password : 'test1234',
    database: 'bnbsso'
  },
  JWT : {
    option : {
      algorithm : 'HS256',
      issuer : 'kang'
    },
    SECRET : 'c65d79d6-cbc6-4fcf-92fe-f6cb67d97ddd'
  }
}

// 개발 환경
const development = {
  API_SERVER : 'http://sso.bnb.com:20200',
  SESSION_DB : {
    host : 'localhost',
    port : 3306,
    user : 'bnbsso',
    password : 'test1234',
    database: 'bnb_sso_api'
  },
  JWT : {
    option : {
      algorithm : 'HS256',
      issuer : 'kang'
    },
    SECRET : 'c65d79d6-cbc6-4fcf-92fe-f6cb67d97ddd'
  }
}

export default process.env.NODE_ENV !== 'production'
  ? development
  : production
