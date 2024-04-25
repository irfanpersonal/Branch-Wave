import {
    Model, Table, Column, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import User from './User';
import {isValidIcon} from '../../utils';

export interface ILink {
    id: string,
    icon: string,
    title: string,
    link: string,
    userId: string,
    user: User,
    createdAt: Date,
    updatedAt: Date
}

@Table({
    modelName: 'Link',
    tableName: 'links',
    freezeTableName: true,
    timestamps: true
})
class Link extends Model<ILink> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            checkIfValidIcon(value: string) {
                if (!isValidIcon(value)) {
                    throw new Error('Invalid Icon');
                }
            }
        }
    })
    declare icon: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    declare title: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    declare link: string;
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    declare userId: string;
    @BelongsTo(() => User)
    declare user: User;
    @CreatedAt
    declare createdAt: Date;
    @UpdatedAt
    declare updatedAt: Date;
}

export default Link;