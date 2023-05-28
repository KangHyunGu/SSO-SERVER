export default (sequelize, DataTypes) => {
	const allowSite = sequelize.define('allowSite', {
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
		freezeTableName: true,
	});
	allowSite.associate = function (models) {
		// associations can be defined here
	};
	return allowSite;
};