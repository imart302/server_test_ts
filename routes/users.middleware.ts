import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import Joi, { func } from 'joi';


const postSchema = Joi.object({
    name : Joi.string().min(3).required(),

    email : Joi.string().min(4).email().required(),

    status : Joi.number().integer().required()
});

const putSchema = Joi.object({

    name : Joi.string().min(3),

    email : Joi.string().min(4).email(),

    status : Joi.number().integer()
});

export function validatePostBody(req: Request, res: Response, next : NextFunction){
    return new Promise( (resolve, reject) => {
        postSchema.validateAsync(req.body)
        .then(value => {
            next();
            resolve(value);
        })
        .catch(error => {
            res.status(400).json(error);
        });
    })
}

export function existsEmail (req: Request, res: Response, next: NextFunction){
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user){
            res.status(400).json({
                msg: "email already exists"
            });
        }
        else{
            next();
        }
    })
    .catch(error => {
        res.status(500).end();
    })
}

export function validatePutBody(req: Request, res: Response, next: NextFunction){
    putSchema.validateAsync(req.body)
    .then(value => {
        if(req.body.email){
            existsEmail(req, res, next);
        }
        else{
            next();
        }
    })
    .catch(error => {
        res.status(400).json(error);
    });
}