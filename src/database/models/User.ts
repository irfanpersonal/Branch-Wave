import {
    Model, Table, Column, DataType, CreatedAt, UpdatedAt, HasMany, BeforeSave
} from 'sequelize-typescript';
import bcryptjs from 'bcryptjs';
import {isValidCountry} from '../../utils';
import Link from './Link';

export interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    bio: string,
    country: string,
    profilePicture: string | undefined,
    createdAt: Date,
    updatedAt: Date
}

@Table({
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
    timestamps: true
})
class User extends Model<IUser> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    })
    declare name: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    })
    declare email: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    declare password: string;
    @Column({
        type: DataType.STRING
    })
    declare bio: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkIfValidCountry(value: string) {
                if (!isValidCountry(value)) {
                    throw new Error('Invalid Country');
                }
            }
        }
    })
    declare country: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: ''
    })
    declare profilePicture: string;
    @HasMany(() => Link)
    declare links: Link[];
    @CreatedAt
    declare createdAt: Date;
    @UpdatedAt
    declare updatedAt: Date;
    @BeforeSave
    static hashPasswordOnCreationOfUserOrPasswordChange = async(instance: User) => {
        if (instance.changed('password')) {
            const randomBytes = await bcryptjs.genSalt(10);
            instance.password = await bcryptjs.hash(instance.password, randomBytes);
        }
    }
    async comparePassword(guess: string) {
        const isCorrect = await bcryptjs.compare(guess, this.password);
        return isCorrect;
    }
}

export default User;