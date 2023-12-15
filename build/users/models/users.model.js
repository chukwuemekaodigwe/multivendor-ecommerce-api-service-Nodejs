require('../../common/services/mongoose.service');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true
});
userSchema.findById = function (cb) {
    return this.model('Users').find({ id: this.id }, cb);
};
const User = mongoose.model('Users', userSchema);
exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result._v;
        return result;
    });
};
exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
            if (err) {
                reject(err);
            }
            else {
                resolve(users);
            }
        });
    });
};
