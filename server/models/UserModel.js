import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Users = db.define('users', {
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sex: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
    },
    address: {
        type:DataTypes.STRING,
        allowNull: false
    },
    idUse: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    univ: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Users;