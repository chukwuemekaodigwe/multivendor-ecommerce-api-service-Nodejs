import jwt from 'jsonwebtoken'
import secret from '../config/env.config'
import crypto from 'crypto'
const jwt_secret = secret.jwt_secret

const ADMIN_PERMISSION = secret['permissionLevels']['ADMIN'];

const minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        if(!req.jwt) return res.status(403).send({success: 'failed', 'message': 'You don\'t have the permission to perform this task'});
        let user_permission_level = parseInt(req.jwt.permissionLevel);
        let userId = req.jwt.userId;
        //console.log(user_permission_level & required_permission_level)
        if (user_permission_level > required_permission_level) {
            return next();
        } else {
            return res.status(403).send({success: 'failed', 'message': 'You don\'t have the permission to perform this task'});
        }
    };
};


const onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
//console.log(req.params.userId)
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (user_permission_level & ADMIN_PERMISSION) {
            return next();
        } else {
            return res.status(403).send({'message': 'You don\'t have the permission to perform this task'});
        }
    }

};

const sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;
    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }
};


export default {
    minimumPermissionLevelRequired,
    onlySameUserOrAdminCanDoThisAction,
    sameUserCantDoThisAction   
}