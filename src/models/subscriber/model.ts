import { Model, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from '../../config/database';
import { Newsletter } from '../newsletter/model';

export class Subscriber extends Model {
    public id!: number;
    public email!: string;
    public newsletterId!:number;
    public createdAt!: Date;

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