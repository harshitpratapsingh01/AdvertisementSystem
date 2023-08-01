const Sequelize = require('sequelize');
import dotenv from 'dotenv'
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'harshit@123',
    database: 'advertisement_mngmnt_db',
});


class Connection {
    static async dbconnection() {
        console.log(sequelize)
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export { sequelize, Connection };