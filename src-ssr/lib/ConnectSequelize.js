import Config from '../../config';
import Sequelize from 'sequelize';

const config = Config.SESSION_DB;

const sequelizeConfig = {
	...config,
	dialect: "mysql",
	logging : false,
}
const sequelize = new Sequelize(
	config.database,
	config.user,
	config.password,
	sequelizeConfig
);

const db = {};
const models = require.context('../models', true, /.js$/);
models.keys().forEach(file=>{
	const model = models(file).default(sequelize, Sequelize.DataTypes);
	db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
	if(db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
