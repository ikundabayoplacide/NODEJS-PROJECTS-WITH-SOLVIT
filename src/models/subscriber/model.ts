    import { Model, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from '../../config/database';
import { Newsletter } from '../newsletter/model';

export class Subscriber extends Model {
    name(email: string, arg1: string, arg2: string, name: any) {
        throw new Error("Method not implemented.");
    }
    public id!: number;
    public email!: string;
    public newsletterId!:number;
    createdAt: any;
}

Subscriber.init(
    {
        email: { 
            type: DataTypes.STRING,
             allowNull: false, 
             unique: true
             },
    },
    { sequelize,
        modelName: 'subscriber',
         tableName: 'subscribers',
        timestamps: true,
    }
);

Subscriber.belongsTo(Newsletter, { foreignKey: 'newsletterId', as:'newsletter'});