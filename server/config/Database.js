import {Sequelize} from 'sequelize';

const db = new Sequelize('auth_db', 'root', 'tntorwndeo1', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

export default db;