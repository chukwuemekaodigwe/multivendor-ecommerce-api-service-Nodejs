
import OrderStatus from '../../common/schemas/order_status'

const findById = async (id) => {
    return OrderStatus.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON();
                delete result._id
                //   delete result._v
                return result
            }
        })

}

const createOrderStatus = async (orderstatusData) => {
    const orderstatus = new OrderStatus(orderstatusData)
    return orderstatus.save()
}

const list = async (perPage, page, vendorId) => {
    return new Promise((resolve, reject) => {
        OrderStatus.find({vendorId: vendorId})
            .limit(perPage)
            .skip(perPage * page)
            .exec().then(function (orderstatuss) {
                resolve(orderstatuss)
            })
            .catch(err => {
                reject(err)
            })
    })
}


const PendingList = async (perPage, page, vendorId) => {
    return new Promise((resolve, reject) => {
        OrderStatus.find({vendorId: vendorId, OrderStatus: {$ne: 'delivered'} } )
            .limit(perPage)
            .skip(perPage * page)
            .exec().then(function (orderstatuss) {
                resolve(orderstatuss)
            })
            .catch(err => {
                reject(err)
            })
    })
}


const findByEmail = async (email) => {
    return OrderStatus.findOne({ email: email })
        .then(res => {
            if (res) {
                res = res.toJSON()
                delete res._id
                // delete res._v
                return res
            } else {
                return undefined
            }
        })
}

const patchOrderStatus = (id, orderstatusData) => {
    return OrderStatus.findOneAndUpdate({
        _id: id
    }, orderstatusData);
};

const removeById = (orderstatusId) => {
    return new Promise((resolve, reject) => {
        OrderStatus.deleteMany({_id: orderstatusId}, (err) => {
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
    createOrderStatus,
    list,   
    findByEmail, PendingList,
    patchOrderStatus, removeById
}