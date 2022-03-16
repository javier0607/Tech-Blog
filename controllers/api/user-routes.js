const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(function() {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      console.log(req.session.loggedIn);
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try{
    const userData = await User.findOne({where: {username: req.body.username}});
    if(!userData){
      res.status(400).json({message: 'Invalid Username!'});
      console.log('Invalid Username!');
      return;
    }
    const validPassword = await userData.verifyPassword(req.body.password);
    if(!validPassword){
      res.status(400).json({message: 'Invalid Password!'});
      console.log('Invalid Password!');
      return;
    }
    req.session.save(function() {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      console.log(req.session.loggedIn);
      res.status(200).json(userData);
    });
  }catch(err){
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;