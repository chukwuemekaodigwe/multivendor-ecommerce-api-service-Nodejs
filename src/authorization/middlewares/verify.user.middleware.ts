import UserModel from '../../users/models/users.model'
import crypto from 'crypto'

const hasAuthValidFields = (req, res, next) => {
    let errors:String[] = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400)
            .send({ errors: errors.join(',') });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({ errors: 'Missing email and password fields' });
    }
};


const isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user) => {
         //   console.log(user)
            if (!user) {
                res.status(404).send({error: 'User not found'});
            } else {
                
                let passwordFields = user.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user.id,
                        email: user.email,
                        permissionLevel: user.permissionLevel,
                        provider: 'email',
                        name: user.firstName + ' ' + user.lastName,
                    };
                    
                    return next();
                } else {
                    return res.status(400).send({ errors: ['Invalid e-mail or password'] });
                }
            }
        });

        
};

export const IsEmailUsed = async (req, res, next) => {

    UserModel.findByEmail(req.body.email).then(user=>{
        if(!user) return next()
        else return res.status(405).send({error: "Email already in use"})
    })
}

export default {
 hasAuthValidFields,
 isPasswordAndUserMatch
}