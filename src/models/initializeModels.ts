import { Blog } from "./blogModel";
import { Comment } from "./commentModel";
import { User } from "./userModel";

export function initializeModels() {
    // Blog.initModel?.();
    Comment.initModel?.();
    // User.initModel?.();
    Blog.hasMany(Comment, { foreignKey: 'blogId', as: 'comments' });
    Comment.belongsTo(Blog, { foreignKey: 'blogId' });

    User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
    Comment.belongsTo(User, { foreignKey: 'userId' });
}