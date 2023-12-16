import mongoose from 'mongoose'
const Schema = mongoose.Schema
const crypto = require('crypto')

const statusSchema = new Schema({
    vendorId:  {type: Schema.Types.ObjectId, ref: 'User'},
    status: String,
    customerId:  {type: Schema.Types.ObjectId, ref: 'Customer'},
    orderId:  {type: Schema.Types.ObjectId, ref: 'Order'},
    location: String,
    dateCreated: Date,
    dateUpdated: Date,
    dateDeleted: Date
})

statusSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

statusSchema.set('toJSON', {
    virtuals: true
})

const OrderStatus = mongoose.model('OrderStatus', statusSchema)

export default OrderStatus
