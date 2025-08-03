import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import {Comment} from "./commentModel";

interface BlogAttributes {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  is_published: boolean;
  comment_count: number;
  likes_count: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

interface BlogCreationAttributes extends Omit<BlogAttributes, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'commentsCount' | 'deleted_at'> { }

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {

  public id!: number;
  public title!: string;
  public slug!: string;
  public description!: string;
  public content!: string;
  public author!: string;
  public is_published!: boolean;
  public comment_count!: number;
  public likes_count!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    comment_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'comment' // Maps to the 'comment' column in DB
    },
    likes_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'likes' // Maps to the 'likes' column in DB
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);




export { Blog };