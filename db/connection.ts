import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'admin3', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    // login: false
});

export default db;