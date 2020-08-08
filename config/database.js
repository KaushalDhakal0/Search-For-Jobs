const mysql = require('mysql2');
const Sequelize = require('sequelize');

module.exports = new Sequelize('schema1', 'root','mysqlworkbench',{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases :  0,

    pool : {
        max : 5,
        min : 0,
        acquire:3000,
        idel: 10000
    },
});

