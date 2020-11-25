var MongoClient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;
var config = require("./config");

class Db {

    static getInstance() {      //解决多次实例化无共享的问题
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor() {
        this.dbClient = "";
        this.connect();
    }

    connect() {          //除第一次连接后，其他不需要再connect;
        let _that = this;
        return new Promise(function (resolve, reject) {
            if (_that.dbClient == "") {
                MongoClient.connect(config.dbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, function (err, dbo) {
                    if (err) {
                        reject(err);
                    } else {
                        var db = dbo.db(config.dbName);
                        _that.dbClient = db;
                        resolve(_that.dbClient);
                    }
                });
            } else
                resolve(_that.dbClient);
        });


    }

    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                var result = db.collection(collectionName).find(json);

                result.toArray(function (err, data) {
                    if (err)
                        reject(err);
                    else
                        resolve(data);

                });

            });

        });

    }

    count(collectionName, json) {
        return new Promise((resolve) => {
            this.connect().then(function (db) {
                var result = db.collection(collectionName).countDocuments(json);

                resolve(result);

            });

        });

    }

    findIdMax(collectionName) {
        return new Promise((resolve, reject) => {
        this.connect().then(function (db) {
            var result = db.collection(collectionName).find().sort({"id":-1}).limit(1);

            result.toArray(function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);

            });

        });

    });


    }

    updata(collectionName, user1,user2) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                db.collection(collectionName).updateOne(user1,{$set:user2},function (err,result) {
                    if (err)
                        reject(err);
                    else
                        resolve(user2);
                });

            });

        });

    }

    insert(collectionName, user) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                db.collection(collectionName).insertOne(user, function (err, res) {
                    if (err)
                        reject(err);
                    else
                        resolve(user);
                });

            });

        });
    }

    remove(collectionName, user) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                db.collection(collectionName).removeOne(user, function (err, res) {
                    if (err)
                        reject(err);
                    else
                        resolve(user);
                });

            });

        });
    }

}


// var mydb = Db.getInstance();
//
// console.time("1");
//
// mydb.find('user',{}).then(function (data) {
//     console.log(data);
//
// });
// console.timeEnd("1");
// console.time("2");
// mydb.count('user',{}).then(function (data) {
//     console.log(data);
//
// });
// console.timeEnd("2");
//
// setTimeout(function () {
//     console.time("3");
//     mydb.count('user',{}).then(function (data) {
//         console.log(data);
//
//     });
//     console.timeEnd("3");
// },1000);
//
// var mydb2 = Db.getInstance();
//
// setTimeout(function () {
//     console.time("3");
//     mydb2.count('user',{}).then(function (data) {
//         console.log(data);
//
//     });
//     console.timeEnd("3");
// },1000);

module.exports=Db.getInstance();