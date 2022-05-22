var express = require('express');
var router = express.Router();
const app = express();
const db = require('../database');

router.use((req, res, next) => {
  console.log("request made to /users ");
  next();
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", (req, res)=> {
  res.set('Access-Control-Allow-Origin', '*');
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const passWord = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const country = req.body.country;
  const birthday = req.body.birthday;
  const family = req.body.family;
  if (email && passWord) {
    db.query(`INSERT INTO users VALUES ('${firstName}', '${lastName}', '${passWord}', '${email}', '${phone}', '${country}',
    '${birthday}', '${family}', '${0}')`, (err, intRes) => {
      if (err) {
        console.log(err);
        res.status(500).send({msg: err.sqlMessage});
      } else {
        res.status(201).send({msg: 'Created User'});
      }
    });
  } else {
    res.status(400).send('bad body... very bad');
  }
});

router.post("/login", (req, res)=> {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  db.query(`SELECT * FROM USERS 
  WHERE email = '${email}' AND passwd = '${password}'`,
  (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else { 
      if (result.length > 0) {
        res.status(201).send(result);
      } else {
        res.status(400).send('wrong credentials given');
      }
    }
  });
});

router.get("/recommended/", (req, res) => {
  const lastName = req.query.lastName;
  const email = req.query.email;
  db.query(`SELECT * from users 
  where lastname = '${lastName}' AND email != '${email}'`,
  (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 0) {
        res.status(201).send(result);
      } else {
        res.status(400).send('No Match found');
      }
    }
  });
});

router.get("/search", (req, res) => {
  const searchName = req.query.searchName;
  const email = req.query.email;
  console.log(email);
  db.query(`SELECT * from users 
  where (LOCATE(firstname, '${searchName}') != 0 OR LOCATE(lastname, '${searchName}') != 0) AND email != '${email}'`,
  (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 0) {
        res.status(201).send(result);
      } else {
        res.status(400).send('No Match found');
      }
    }
  });
});

router.post("/description", (req, res) => {
  const email = req.body.email;
  const bio = req.body.aboutMe;
  const relatives = req.body.family;
  db.query(`INSERT INTO description VALUES('${email}', '${bio}', '${relatives}')`,
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({msg: err.sqlMessage});
    } else {
      res.status(201).send({msg: 'added description'});
    }
  });
});

router.post("/changeState", (req, res) => {
  const email = req.body.email;
  db.query(`Update users
  SET createdBio = 1
  where email = '${email}'`,
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({msg: err.sqlMessage});
    } else {
      res.status(201).send({msg: 'change succesfull'});
    }
  });
});

router.get("/description", (req, res) => {
  const email = req.query.email;
  db.query(`SELECT * from description 
  WHERE username = '${email}'`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.sqlMessage);
    } else {
      if (result.length > 0) {
        res.status(201).send(result);
      } else {
        res.status(400).send('No description found');
      }
    }
  });
});

module.exports = router;
