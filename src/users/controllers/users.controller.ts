import UserModel from '../models/users.model'
import * as crypto from 'node:crypto'
import config from '../../common/config/env.config'
import {userType} from '../../common/interfaces/typings'
import {Request, Response, NextFunction } from 'express'
import { send } from 'node:process'

const insert = (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = config.permissionLevels.PAID_USER  //this route serves for new vendors
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
        .catch((err)=>{
            res.status(500).send('An error occured')
            next(err)
        })
};

const insertAdmin = (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;

    req.body.permissionLevel = config.permissionLevels.ADMIN  //this route serves for Syatem Admins
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
        .catch((err)=>{
            res.status(500).send({error: err})
            //next(err)
        })
};


const updateProfile = (req, res) => {
    const data = req.body
  data.defaultCurrency = data.currency
   let user = req.jwt.userId
    UserModel.updateProfile(data, user)
    .then(result => {
        res.status(200).send({result: result})
    })
    .catch(err => {
        res.status(500).send({error: err})
    })
}

const list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 25;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};


const getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};


const patchById = (req, res) => {
    if (req.body.password) {
 
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send(result);
        });

};

const removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};


export default {
    removeById,
    patchById,
    getById,
    insert, updateProfile,
    list, insertAdmin
}