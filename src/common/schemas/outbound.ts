import mongoose from 'mongoose'
const Schema = mongoose.Schema
const crypto = require('crypto')


const outboundSchema = new Schema({
    vendorId:  {type: Schema.Types.ObjectId, ref: 'User'},
    orderId: {type: Schema.Types.ObjectId, ref: 'Order'},
    productId:  {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: Schema.Types.Decimal128,
    costprice: Schema.Types.Decimal128,
    sellingprice: Schema.Types.Decimal128,
    measuring_unit: String,
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer'},
    dateDeleted: Date
}, {timestamps: true})

outboundSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

outboundSchema.set('toJSON', {
    virtuals: true
})



const OutBoundSales = mongoose.model('OutBoundSales', outboundSchema)

export default OutBoundSales
