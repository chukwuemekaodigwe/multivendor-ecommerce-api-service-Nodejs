import Billing from '../../common/schemas/billing'

export const insertBilling = async (data) => {
    const billing = new Billing(data)
    return billing.save()
}

const findById = async (id) => {
    return Billing.findById(id)
        .then((result) => {
            if (!result) return
            result = result.toJSON();
            delete result._id
            return result
        })
}

const billsByCustomer = async (customerId) => {
    return Billing.find({customerId: customerId})
    .then((res) => {
        if(!res) return
        res = res.toJSON()
        delete res._id
        return res
    })
}

const billByOrderId = async (id) => {
    return Billing.find({orderId: id})
    .then((res) => {
        if(!res) return
        res = result.toJSON()
        delete res._id
        return res
    })
}


const billsByVendor = async (perPage, page, vendor) => {
    return new Promise((resolve, reject) => {
        Billing.find({ vendorId: vendor })
            .limit(perPage)
            .skip(perPage * page)
            .exec()
            .then((res) => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const billsByDate = async (perPage, page, vendor, date) => {
    return new Promise((resolve, reject) => {
        Billing.find({ vendorId: vendor, dateCreated: date })
            .limit(perPage)
            .skip(perPage * page)
            .exec()
            .then((res) => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}


const updateBilling = async (id, data) => {
    return Billing.findOneAndUpdate({
        _id: id,

    }, data)
}

const deleteBilling = (id) => {
 return new Promise((resolve, reject) => {
    Billing.deleteOne({_id: id}, (err, response)=>{
        if(err){
            reject(err)
        }else{
            resolve(err)
        }
    })
 })   
}

export default {
    insertBilling,
    findById,
    updateBilling,
    deleteBilling,
    billByOrderId,
    billsByCustomer,
    billsByDate,
    billsByVendor
}


