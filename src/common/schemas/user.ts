import mongoose from 'mongoose'
import { nextTick } from 'process'
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
    businessName: String,
    dateDeleted: Date,
}, {timestamps: true})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.virtual('vendorKey').get(function () {
    const str = this._id.toHexString()
   return  str.split('').reverse().join('')
})


userSchema.set('toJSON', {
    virtuals: true
})


const User = mongoose.model('User', userSchema)

export default User
