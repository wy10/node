var mysql = require('mysql');
var dbConfig = require('../config/config');
var sql = require('./sql')

/**
 * 遍历数据的值,存入数组
 *
 * @param {*} obj
 * @return {*} 
 */
const paramList = (obj) => {
    let paramArr = [];
    for (let key in obj) {
        if (obj[key]) {
            paramArr.push(obj[key]);
        }
    }
    return paramArr;
};

const queryAll = function (table, callback) {
    //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        //开始数据操作
        connection.query(sql[table].queryAll, function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
            callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
            //results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
            //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
        });
    });
}
const queryById =  function (table, req, callback) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        let paramValue = paramList(req);
        connection.query(sql[table].queryById, [...paramValue], function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
        });
    });
}
const addDB = function (table, req, callback) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        let paramValue = paramList(req);
        connection.query(sql[table].insert, [...paramValue], function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
        });
    });
}
const deleteDB = function(table, req, callback) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        let paramValue = paramList(req);
        connection.query(sql[table].delete, [...paramValue], function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
        });
    });
}
const updateDB=  function (table, req, callback) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        let paramValue = paramList(req);
        connection.query(sql[table].update, [...paramValue], function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
        });
    });
}

const query = function (table,methods,req,callback) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        let paramValue = paramList(req);
        connection.query(sql[table][methods], [...paramValue], function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            callback && callback(results, fields);
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
        });
    });
    
}
module.exports = {
    queryAll,
    query,
    queryById,
    addDB,
    updateDB,
    deleteDB
};