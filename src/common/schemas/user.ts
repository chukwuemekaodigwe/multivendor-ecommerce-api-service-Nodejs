import mongoose from 'mongoose'
const Schema = mongoose.Schema
const crypto = require('crypto')

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    defaultCurrency: String,
    address: String,
    city: String,
    country: String,
    email: String,
    password: String,
    permissionLevel: Number,
    dateCreated: Date,
    dateUpdated: Date,
    dateDeleted: Date,
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true
})

const User = mongoose.model('User', userSchema)

export default User
