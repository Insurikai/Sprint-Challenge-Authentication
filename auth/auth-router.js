const router = require('express').Router();
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  }
  return jwt.sign(payload, 'secretSoups', { expiresIn: '3min' })
}

router.post('/register', (req, res) => {
  // implement registration
  try {
    db('users').insert({username: req.body.username, password: bcrypt.hashSync(req.body.password, 6)}).then(id => {
      db('users').where({id: id[0]}).first().then(user => {
        token = createToken(user);
        res.status(201).json({message: 'Registered and Logged in.', token})
      })
    }).catch(err => {
      res.status(500).json({message: 'Couldn\'t register.', error: err})
    })
  } catch (error) {
    res.status(500).json({message: 'Couldn\'t register.', error: error})
  }
});

router.post('/login', (req, res) => {
  db('users').where({username: req.body.username}).first().then(user => {
    if(!bcrypt.compareSync(req.body.password, user.password)){ 
      res.status(401).json({message: 'Invalid credentials.'})
    }else{
      token = createToken(user);
      res.status(200).json({message: 'Logged in.', token})
    }
  }).catch(err=>{
    res.status(500).json({message: 'Couldn\'t log in.', error: err})
  })
});

module.exports = router;
