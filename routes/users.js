var express = require('express');
var router = express.Router();
const db = require('../utils/db');
const constant = require("../utils/constant");

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

router.post('/limit', function (req, res, next) {
  let params = {
    name:`%${req.body.name ? req.body.name : ""}%`,
    start:req.body.index? req.body.index * constant.page_size:0,
    length:constant.page_size,
  }
  db.query(`USERS`,'queryByLimit',params, function (results, fields) {
    res.json({
      code: 0,
      data: {
        list: results
      }
    });
  })
});


router.post('/add', function (req, res, next) {
  db.query(`USERS`,'insert',{ ...req.body, password:'123456' }, function (results, fields) {
    res.json({
      code: 0,
      data: {
        id: results.insertId
      }
    });
  })
});

router.put('/update', function (req, res, next) {
  db.query(`USERS`,'update',{ name:req.body.name, id:req.body.id }, function (results, fields) {
    res.json({
      code: 0,
      data: {
        id: results.insertId
      }
    });
  })
});

router.delete('/delete', function (req, res, next) {
  db.query(`USERS`,'delete',{ ...req.query }, function (results, fields) {
    res.json({
      code: 0,
    });
  })
});

module.exports = router;
