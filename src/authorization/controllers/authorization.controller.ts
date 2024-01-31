import { request, Response } from 'express'
import * as crypto from 'node:crypto'
import config from '../../common/config/env.config'
import jwt from 'jsonwebtoken'
import User from '../../users/models/users.model'
import { sendPasswordReset } from '../../common/services/email.service'
import usersModel from '../../users/models/users.model'


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
        res.status(200).send({ accessToken: token, refreshToken: refresh_token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};

const refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(200).send({ id: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};


const reset_password = (req, res) => {
    let email = req.body.email
    if (!email) return res.status(400).send({ message: 'email field is required' })
    User.findByEmail(email)
        .then(async(result) => {
            if (!result) return res.status(404).send({ message: 'account not found' })
            let passkey = crypto.randomBytes(5).toString('hex')
          
           await sendPasswordReset(result, passkey).then((r) => {
             let  newPassword = saveNewPassword(result, passkey)
              let a = usersModel.updatePassword(result._id, newPassword)
               // console.log(a)
                res.status(200).send({message: 'Proceed to your email to continue'})
            })
                .catch((err) => {
                    console.log(err)
                    res.status(500).send({ message: 'an error occured' })
                })
        })

}

function saveNewPassword(userData, password) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    let data = userData
    password = salt + "$" + hash;
    return password;
//console.log({'userData': userData, 'newPassword': data.password})
  //return await User.updateProfile(data, data._id)
     
}

export default {
    login,
    refresh_token,
    reset_password
}