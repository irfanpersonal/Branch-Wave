import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import User from '../database/models/User';
import Link, {ILink} from '../database/models/Link';
import {ITokenPayload} from '../utils';
import CustomError from '../errors';

interface LinkRequest extends Request {
    params: {
        id: string
    },
    body: ILink,
    query: {
        page: string,
        limit: string
    }
    user?: ITokenPayload
}

const getLinksForUser = async(req: LinkRequest, res: Response) => {
    const {id} = req.params;
    const user = await User.findOne({
        where: {
            name: id
        }
    });
    if (!user) {
        throw new CustomError.NotFoundError('No User Found with the Name Provided!');
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let result = Link.findAll({
        where: {
            userId: user.id
        },
        offset: skip,
        limit: limit
    });
    const links = await result;
    const totalLinks = (await Link.findAll({where: {userId: user.id}})).length;
    const numberOfPages = Math.ceil(totalLinks / limit);
    return res.status(StatusCodes.OK).json({links, totalLinks, numberOfPages});
}

const createLink = async(req: LinkRequest, res: Response) => {
    req.body.userId = req.user!.userID;
    const link = await Link.create(req.body);
    return res.status(StatusCodes.CREATED).json({link});
}

const updateLink = async(req: LinkRequest, res: Response) => {
    const {id} = req.params;
    const doesThisLinkExist = await Link.findByPk(id);
    if (!doesThisLinkExist) {
        throw new CustomError.NotFoundError('No Link Found with the ID Provided!');
    }
    await Link.update(
        {...req.body},
        {
            where: {
                id: id
            }
        }
    )
    const link = (await Link.findByPk(id))!;
    return res.status(StatusCodes.OK).json({link});
}

const deleteLink = async(req: LinkRequest, res: Response) => {
    const {id} = req.params;
    const link = await Link.findByPk(id);
    if (!link) {
        throw new CustomError.NotFoundError('No Link Found with the ID Provided!');
    }
    await link.destroy();
    return res.status(StatusCodes.OK).json({msg: 'Deleted Link'});
}

export {
    getLinksForUser,
    createLink,
    updateLink,
    deleteLink
};