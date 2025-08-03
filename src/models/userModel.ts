import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/database";
import { GenderEnum,roleNum } from "../schemasForValidation/userSchema.";


class User extends Model {
    static associate() {
      throw new Error('Method not implemented.');
    }
    public id!: number;
    public name!: string;
    public email!: string;
    public role!: roleNum;
    public gender!: GenderEnum;
    public phoneNumber!: string | null;
    public password!: string;
    public isActive!: boolean;
    public created_at!: Date;
    public updated_at!: Date;    
    public deleted_at!: Date | null;
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
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: true, // Enables soft delete
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);
export {User};
