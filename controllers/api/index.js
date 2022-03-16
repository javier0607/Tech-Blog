const router = require('express').Router();

//All the API routes needed
const commentRoutes = require('./comment-routes.js');
const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');

// Api routes to proper locations
router.use("/comment",commentRoutes);
router.use("/post",postRoutes);
router.use("/user",userRoutes);

module.exports = router;