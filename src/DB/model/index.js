export * from './user.model.js'
export * from './post.model.js'
export * from './comment.model.js'

import { UserModel } from './user.model.js';
import { PostsModel } from './post.model.js';
import { CommentsModel } from './comment.model.js';

UserModel.hasMany(PostsModel, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

PostsModel.belongsTo(UserModel, {
  foreignKey: 'userId'
});

UserModel.hasMany(CommentsModel, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

CommentsModel.belongsTo(UserModel, {
  foreignKey: 'userId'
});

PostsModel.hasMany(CommentsModel, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

CommentsModel.belongsTo(PostsModel, {
  foreignKey: 'postId'
});

export {
  UserModel,
  PostsModel,
  CommentsModel
};









