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

const list = async (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec().then(function (users) {
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
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


export default {
    findById,
    createUser,
    list,   
    findByEmail,
    patchUser, removeById
}