import {request, Response} from 'express'
import * as crypto from 'node:crypto'
import config from '../../common/config/env.config'
import jwt from 'jsonwebtoken'

const jwtSecret = config.jwt_secret

const login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(200).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

const refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(200).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

export default {
    login,
    refresh_token
}