import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./userModel";
import { Blog } from "./blogModel";

interface CommentAttributes {
  id: number;
  comment: string;
  userId: number;
  blogId: number;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: number;
  public comment!: string;
  public userId!: number;
  public blogId!: number;

  static initModel() {
    Comment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'user_id'
        },
        blogId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'blog_id'
        }
      },
      {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: true,
        underscored: true
      }
    );
  }

  static associate() {
    Comment.belongsTo(User, { foreignKey: 'userId' });
    Comment.belongsTo(Blog, { foreignKey: 'blogId' });
  }
}


export { Comment };