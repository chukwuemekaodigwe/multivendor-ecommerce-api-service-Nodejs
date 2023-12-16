import mongoose from 'mongoose'
const Schema = mongoose.Schema
const crypto = require('crypto')

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNo: String,
    address: String,
    city: String,
    country: String,
    dateCreated: Date,
    dateUpdated: Date,
    vendorId:  {type: Schema.Types.ObjectId, ref: 'User'},
})

customerSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

customerSchema.set('toJSON', {
    virtuals: true
})

const Customer = mongoose.model('Customer', customerSchema)

export default Customer