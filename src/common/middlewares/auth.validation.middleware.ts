import jwt from 'jsonwebtoken'
import secret from '../config/env.config'
import crypto from 'crypto'
import { CheckVendorId } from '../../users/models/users.model'

const jwt_secret = secret.jwt_secret


const verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({ error: 'need to pass refresh_token field' });
    }
};

const validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + jwt_secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid refresh token' });
    }
};


const validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], jwt_secret);
                return next();
            }

        } catch (err) {
            // console.log(err)
            return res.status(403).send({ error: 'Authorization failed' });
        }
    } else {
        return res.status(401).send({ error: 401, message: 'No authorization found, Please login ' });
    }
};

// to know and identify request from public pages in order to link up request to its respective vendor

const isRequestValid = (req, res, next) => {
    let requester = req.headers['vendorid'];
    if (!requester) return res.status(403).send({ error: 'Authorization failed, vendor unknown' });
    requester = requester.split('').reverse().join('')
    // console.log(requester)
    CheckVendorId(requester).then((result: any) => {
         
        req.jwt = result
        req.jwt.userId = requester
        return next()
    })
        .catch(err => {
            console.log(err)
            return res.status(403).send({ error: 'Authorization failed, vendor unknown' });
        })
}


export default {
    validJWTNeeded,
    validRefreshNeeded,
    verifyRefreshBodyField,
    isRequestValid,

}