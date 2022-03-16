const User = require('./User.js');
const Comment = require('./Comment.js');
const Post = require('./Post.js');


User.hasMany(Post, {
  foreignKey: "user_id"
});

User.hasMany(Comment, {
  foreignKey: "user_id"
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});

Post.belongsTo(User, {
  foreignKey: "user_id"
});

Comment.belongsTo(User, {
  foreignKey: "user_id"
});

Comment.belongsTo(Post, {
  foreignKey: "post_id"
});


module.exports = {
  User,
  Comment,
  Post
};