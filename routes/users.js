var express = require('express');
var router = express.Router();
const db = require('../utils/db');

router.post('/', function (req, res, next) {
  db.query(`USERS`,'queryByNameAndPassword',{ ...req.body }, function (results, fields) {
    res.json({
      code: 0,
      data: {
        list: results
      }
    });
  })
});

router.post('/add', function (req, res, next) {
  db.query(`USERS`,'insert',{ ...req.body,password:'123456' }, function (results, fields) {
    res.json({
      code: 0,
      data: {
        id: results.insertId
      }
    });
  })
});


module.exports = router;
