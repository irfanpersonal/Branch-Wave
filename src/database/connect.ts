import {Sequelize} from 'sequelize-typescript';

const sequelize = new Sequelize({
    database: 'branch_wave',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_USER_PASSWORD,
    dialect: 'mysql',
    models: [__dirname + '/models'],
    logging: false
});

const syncTables = async() => {
    await sequelize.sync();
}

syncTables();

export default sequelize;