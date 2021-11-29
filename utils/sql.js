const USERS = {
  queryById:'SELECT * FROM USERS WHERE ID=?',
  queryAll:'SELECT * FROM USERS',
  queryByNameAndPassword:'SELECT * FROM USERS WHERE NAME=? AND PASSWORD=?',
  queryByLimit:'SELECT * FROM USERS WHERE NAME LIKE ? LIMIT ?,?',
  insert:'INSERT INTO USERS(NAME,PASSWORD) VALUES(?,?)',
  update:'UPDATE USERS SET NAME=? WHERE ID=?',
  delete:'DELETE FROM USERS WHERE ID=?',
}

module.exports = {
  USERS
}