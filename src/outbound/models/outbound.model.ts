import Outbound from '../../common/schemas/outbound'

const findById = async (id) => {
    return Outbound.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON();
                delete result._id
                //   delete result._v
                return result
            }
        })

}

const createOutbound = async (outboundData) => {
    const outbound = new Outbound(outboundData)
    return outbound.save()
}


const ByVendorId = async (perPage, page, vendorId) => {
    return new Promise((resolve, reject) => {
        Outbound.find({vendorId: vendorId})
            .limit(perPage)
            .skip(perPage * page)
            .exec().then(function (outbounds) {
                resolve(outbounds)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const ByCustomer = async (perPage, page, customerId) => {
    return new Promise((resolve, reject) => {
        Outbound.find({customerId: customerId})
            .limit(perPage)
            .skip(perPage * page)
            .exec().then(function (outbounds) {
                resolve(outbounds)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const ByProductId = async (perPage, page, productId) => {
    return new Promise((resolve, reject) => {
        Outbound.find({productId: productId})
            .limit(perPage)
            .skip(perPage * page)
            .exec().then(function (outbounds) {
                resolve(outbounds)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const ByOrderId = async (perPage, page, orderId) => {
    return new Promise((resolve, reject) => {
        Outbound.find({orderId: orderId})
            
            .exec().then(function (outbounds) {
                resolve(outbounds)
            })
            .catch(err => {
                reject(err)
            })
    })
}


const patchOutbound = (id, outboundData) => {
    return Outbound.findOneAndUpdate({
        _id: id
    }, outboundData);
};

const removeById = (outboundId) => {
    return new Promise((resolve, reject) => {
        Outbound.deleteMany({_id: outboundId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


export default {
    findById,
    createOutbound,
    
    patchOutbound, removeById
}