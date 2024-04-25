import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import User, {IUser} from '../database/models/User';
import {ITokenPayload, deleteImage} from '../utils';
import CustomError from '../errors';
import Sequelize from 'sequelize';
import {UploadedFile} from 'express-fileupload';
import path from 'node:path';
import {v2 as cloudinary} from 'cloudinary';
import Link from '../database/models/Link';

interface UserRequest extends Request {
    params: {
        id: string
    },
    body: IUser & {
        oldPassword: string,
        newPassword: string
    },
    query: {
        search: string,
        role: 'guest' | 'host',
        country: string,
        sort: 'latest' | 'oldest'
        page: string,
        limit: string
    }
    user?: ITokenPayload
}

const showCurrentUser = async(req: UserRequest, res: Response) => {
    const user = await User.findByPk(req.user!.userID, {
        attributes: {exclude: ['password']}
    });
    return res.status(StatusCodes.OK).json({user});
}

const getAllUsers = async(req: UserRequest, res: Response) => {
    const {search, country, sort} = req.query;
    const queryObject: {[index: string]: any, [index: symbol]: any} = {};
    if (search) {
        queryObject.name = {[Sequelize.Op.like]: `%${search}%`};
    }
    if (country) {
        queryObject.country = {[Sequelize.Op.like]: `%${country}%`};
    }
    let order: Sequelize.OrderItem[] | undefined;
    if (sort === 'oldest') {
        order = [['createdAt', 'ASC']]; 
    } else if (sort === 'latest') {
        order = [['createdAt', 'DESC']];
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let result = User.findAll({
        where: queryObject,
        offset: skip,
        limit: limit,
        order: order,
        attributes: {exclude: ['password']}
    });
    const users = await result;
    const totalUsers = (await User.findAll({where: queryObject})).length;
    const numberOfPages = Math.ceil(totalUsers / limit);
    return res.status(StatusCodes.OK).json({users, totalUsers, numberOfPages});
}

const getSingleUser = async(req: UserRequest, res: Response) => {
    const {id} = req.params;
    const user = await User.findOne({
        where: {
            name: id
        },
        attributes: {exclude: ['password']}
    });
    if (!user) {
        throw new CustomError.NotFoundError('No User Found with the Name Provided!');
    }
    return res.status(StatusCodes.OK).json({user});
}

const updateUser = async(req: UserRequest, res: Response) => {
    req.body.profilePicture = undefined;
    // By default the Sequelize Validation will run so no need to write it out
    await User.update(
        {...req.body},
        {
            where: {
                id: req.user!.userID
            }
            // returning: true, This will make it so that it will return the updated row, but this only works if your database is Postgres, because were using MySQL it won't work        
        }
    )
    // Because the database I am using is MySQL the returning option won't work. So
    // I will have to search it again just to return it. Sucks!
    const user = (await User.findByPk(req.user!.userID, {
        attributes: {exclude: ['password']}
    }))!;
    // Check if Profile Picture Provided
    if (req.files?.profilePicture) {
        const profilePicture = req.files.profilePicture as UploadedFile;
        const maxSize = 1000000 * 2;
        if (!profilePicture.mimetype.startsWith('image') || profilePicture.size > maxSize) {
            throw new CustomError.BadRequestError('Invalid Profile Picture submission!');
        }
        if (user.profilePicture) {
            const oldImage = user.profilePicture.substring(user.profilePicture.indexOf('BRANCH'));
            await cloudinary.uploader.destroy(oldImage.substring(0, oldImage.lastIndexOf('.')));
        }
        const uniqueIdentifierForProfilePicture = new Date().getTime() + '_' + user.name + '_' + 'profile_picture' + '_' + profilePicture.name;
        const destinationForProfilePicture = path.resolve(__dirname, '../images', uniqueIdentifierForProfilePicture);
        await profilePicture.mv(destinationForProfilePicture);
        const resultForProfilePicture = await cloudinary.uploader.upload(destinationForProfilePicture, {
            public_id: uniqueIdentifierForProfilePicture, 
            folder: 'BRANCH_WAVE/PROFILE_PICTURES'
        });
        await deleteImage(destinationForProfilePicture);
        user.profilePicture = resultForProfilePicture.secure_url;
        await user.save();
    }
    return res.status(StatusCodes.OK).json({user});
}

const updateUserPassword = async(req: UserRequest, res: Response) => {
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide oldPassword and newPassword!');
    }
    const user = (await User.findByPk(req.user!.userID))!;
    const isCorrect = await user.comparePassword(oldPassword);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Incorrect Old Password!');
    }
    user.password = newPassword;
    await user.save();
    return res.status(StatusCodes.OK).json({user: {
        userID: user.id,
        name: user.name,
        email: user.email
    }});
}

export {
    showCurrentUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUserPassword
};