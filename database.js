var pgp = require('pg-promise')({});
var connectionString = 'postgres://bzipytoprfnujx:0cfe35df2d8203869345e583a8d5b17e37fd493556763bccc57f93eecd2e48c4@ec2-50-17-194-129.compute-1.amazonaws.com:5432/dbt889ljof5t0l';
var db = pgp(connectionString);

module.exports = db;