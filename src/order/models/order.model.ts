import Order from '../../common/schemas/order'

const insertOrder = async (data) => {
    const order = new Order(data)
    return order.save()
}

const findById = async (id) => {
    return Order.findById(id)
        .then((result) => {
            if (!result) return
            result = result.toJSON();
            delete result._id
            return result
        })
}

const getDetailledById = async (id) => {
    return Order.findById(id)
        .populate('outbound')
        .populate('product')
        .populate('customer')
        .populate('OrderStatus')
        .exec()
        .then((result) => {
            if (!result) return
            result = result.toJSON();
            delete result._id
            return result
        })
}

const getByTrackingId = async (id) => {
    return Order.findOne({trackingId: id})
        .populate('outbound')
        .populate('product')
        .populate('customer')
        .populate('OrderStatus')
        .exec()
        .then((result) => {
            if (!result) return
            result = result.toJSON();
            delete result._id
            return result
        })
}

const getByInvoiceId = async (id) => {
    return Order.findOne({ invoiceId: id })
        .populate('outbound')
        .populate('product')
        .populate('customer')
        .exec()
        .then((result) => {
            if (!result) return
            result = result.toJSON();
            delete result._id
            return result
        })
}


const list = async (perPage, page, vendor) => {
    return new Promise((resolve, reject) => {
        Order.find({ vendorId: vendor })
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

const updateOrder = async (id, data) => {
    return Order.findOneAndUpdate({
        _id: id
    }, data)
}


const deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        Order.deleteOne({ _id: id }, (err, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })
    })
}


export default {
    insertOrder,
    findById,
    updateOrder,
    deleteOrder, getByTrackingId,
    list, getByInvoiceId, getDetailledById
}


