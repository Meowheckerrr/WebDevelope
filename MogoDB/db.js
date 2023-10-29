const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/gunShops')
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch((err) => {
                console.log(err);
                return cb(err); // 將錯誤傳遞給回調函數
            });
    },
    getDB: () => dbConnection
};