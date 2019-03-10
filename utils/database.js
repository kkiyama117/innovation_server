const database = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

/**
 * MySQLに接続してSQLを実行する
 * @param sql 実行したいSQL
 * @param values SQLに指定するパラメータ
 * @param callback SQL実行後、処理するイベント
 */
// 接続先情報は適当に変更すること
db_pool = database.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'innovation',
});

exports.connection = db_pool;
