import mongoose from 'mongoose'
const Schema = mongoose.Schema
const crypto = require('crypto')

const OrderSchema = new Schema({
    vendorId: {type: Schema.Types.ObjectId, ref: 'User'},
    status: String,
    customerId: {type: Schema.Types.ObjectId, ref: "Customer"},
    invoiceId: String,
    grossTotal: Schema.Types.Decimal128,
    trackingId: String,
    dateDeleted: Date,
}, {timestamps: true})

OrderSchema.virtual('id').get(function () {
    return this._id.toHexString()
})


OrderSchema.set('toJSON', {
    virtuals: true
})

const Order = mongoose.model('Order', OrderSchema)

export default Order