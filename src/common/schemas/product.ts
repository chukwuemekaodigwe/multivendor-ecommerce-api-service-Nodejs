import mongoose from 'mongoose'
const Schema = mongoose.Schema
const crypto = require('crypto')

const productSchema = new Schema({
    vendorId:  {type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    sku:  String,
    picture: [String],
    costprice: Schema.Types.Decimal128,
    sellingprice: Schema.Types.Decimal128,
    measuring_unit:String,
    description: String,
    dateCreated: Date,
    dateUpdated: Date,
    dateDeleted: Date
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

productSchema.set('toJSON', {
    virtuals: true
})

const Product = mongoose.model('Product', productSchema)

export default Product