export default (sequelize, DataTypes) => {
  const allowSite = sequelize.define('allowSite', {
    // 테이블 정의
    // | Field | DataType | Constraints | comment |
    // | --- | --- | --- | --- |
    // | id | Int unsingned |  PK | 아이디 |
    // | appName | String | unique | 허용 애플리캐이션 이름 |
    // | siteUrl | String | Not Null | 허용 앱 URL |
    // | allowed | Enum (Y,N) |  | 접근 허용 여부 기본값 Y |
    // | appToken | String | Not Null | 앱 접근 유효 토큰 (랜덤생성) |

    appName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'theapp',
		},
		siteUrl: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'theapp',
			validate: {
				isUrl: true,
			}
		},
		allowed: {
			type: DataTypes.ENUM('Y', 'N'),
			allowNull: false,
			defaultValue: 'Y'
		},
		appToken: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
		},

  }, {
    // 옵션
    // 모든 TableName을 복수형이 아닌 Model을 설정할때 이름 그대로 사용하게 해준다.
    freezeTableName: true,
  });
  allowSite.associate = function(models) {
    // associations can be defined here
    // 관계 설정
  };
  return allowSite;
};
