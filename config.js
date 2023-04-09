// 운영 환경
const production = {
  API_SERVER : 'http://sso.bnb.com:20300',
  SESSION_DB : {
    host : 'localhost',
    port : 3306,
    user : 'bnbsso',
    password : 'test1234',
    database: 'bnbsso'
  }
}

// 개발 환경
const development = {
  API_SERVER : 'http://sso.bnb.com:20300',
  SESSION_DB : {
    host : 'localhost',
    port : 3306,
    user : 'bnbsso',
    password : 'test1234',
    database: 'bnb_sso_api'
  }
}

export default {production, development}
