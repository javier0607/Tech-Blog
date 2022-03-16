const router = require('express').Router();
const Post = require('../models/Post.js');
const User = require('../models/User');
const withAuth = require('../utils/auth.js');

router.get('/', withAuth, async (req, res) => {
   const postData = await Post.findAll({
    where: {
      user_id: req.session.user_id
    }
  });
  const userData = await User.findByPk(req.session.user_id);
  const posts = postData.map(Element => Element.get({ plain: true }));
  const user = userData.get({ plain: true});
  console.log(posts);
  res.render("profile", { posts, user, layout: "dashboard" });
});

router.get('/new', withAuth, (req, res) => {
  res.render("new-post", {layout: "dashboard"});
});

router.get('/edit/:id', withAuth, async (req, res) => {
  const postData = await Post.findByPk(req.params.id);
  const post = postData.get({ plain: true });
  post.layout = "dashboard";
  res.render("edit-post", post);
});

module.exports = router;