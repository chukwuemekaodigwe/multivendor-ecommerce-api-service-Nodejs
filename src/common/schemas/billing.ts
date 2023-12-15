import mongoose from 'mongoose'
const Schema = mongoose.Schema
const crypto = require('crypto')

const billingSchema = new Schema({
    vendorId:  {type: Schema.Types.ObjectId, ref: 'User'},
    amountPaid: String,
    paymentMethod: String,
    paymentDetail: String,
    customerId:  {type: Schema.Types.ObjectId, ref: 'Customer'},
    orderId:  {type: Schema.Types.ObjectId, ref: 'Order'},
    dateCreated: Date,
    dateUpdated: Date,
    dateDeleted: Date
})

billingSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

billingSchema.set('toJSON', {
    virtuals: true
})

const Billing = mongoose.model('Billing', billingSchema)

export default Billing