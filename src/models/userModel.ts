import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/database";
import { GenderEnum,roleNum } from "../schemasForValidation/userSchema.";


class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public role!: roleNum;
    public gender!: GenderEnum;
    public phoneNumber!: string | null;
    public password!: string;
    public isActive!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;    
    public deletedAt!: Date | null;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(roleNum)),
            allowNull: false,   
            defaultValue: roleNum.user
        },
        gender: {
            type: DataTypes.ENUM(...Object.values(GenderEnum)),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field:'isActive',
        },
        phoneNumber:{
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: true, // Enables soft delete
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
    }
);
export default User;
