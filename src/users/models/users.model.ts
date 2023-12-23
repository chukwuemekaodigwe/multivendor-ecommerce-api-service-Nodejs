import { resolve } from 'node:path';
import User from '../../common/schemas/user'

const findById = async (id) => {
    return User.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON();
                delete result._id
                //   delete result._v
                return result
            }
        })

}

const createUser = async (userData) => {
    const user = new User(userData)
    return user.save()
}

const updateProfile = async (userData, userId) => {

    return new Promise(async (resolve, reject) => {
        // let u = User.findOne({_id: userId})
        await User.findOneAndUpdate({ _id: userId }, userData, {returnDocument: 'after', runValidators: true})
            .then((result) => {
                if (result) resolve(result)
                return reject(result)
            })
    })

}

const list = async (perPage, page) => {
    return new Promise((resolve, reject) => {
       const query = User.find()
            .limit(perPage)
            
            if(page > 1){
                query.skip(perPage * page)
            }
            
            
            query.exec().then(function (users) {
                resolve(users)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const findByEmail = async (email) => {
    return User.findOne({ email: email })
        .then(res => {
           // console.log(res)
            if (res) {
                res = res.toJSON()
                delete res._id
                // delete res._v
                return res
            } else {
                return undefined
            }
        })
}

const patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

const removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({ _id: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

export const CheckVendorId = (vendorCode) => {
    return new Promise(async(resolve, reject) => {
      
        User.findById(vendorCode)

        .then(res =>{
          //  console.log(res)
            if(!res) return reject()
            return resolve(res)
        })
    })
}


export default {
    updateProfile,
    findById,
    createUser,
    list, CheckVendorId,
    findByEmail,
    patchUser, removeById,
}