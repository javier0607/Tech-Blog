const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth.js');

router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(400).json("Could not make post.")
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = Post.update({
      title: req.body.title,
      body: req.body.body,
    },{
      where:{
        id: req.params.id
      }
    })
    if(!postData){
      res.status(400).json("Could not find post!");
      return;
    }
    res.status(200).json("postData");
  } catch (error) {
    res.status(400).json("Could not make post.")
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = Post.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!postData){
      res.status(400).json("Could not find post!");
      return;
    }
    res.status(200).json("postData");
  } catch (error) {
    res.status(400).json("Could not make post.")
  }
});

module.exports = router;