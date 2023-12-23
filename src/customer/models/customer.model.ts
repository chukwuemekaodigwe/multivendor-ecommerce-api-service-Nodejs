import Customer from '../../common/schemas/customer'

const findById = async (id) => {
    return Customer.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON();
                delete result._id
                //   delete result._v
                return result
            }
        })

}

const createCustomer = async (customerData) => {
    const customer = new Customer(customerData)
    return customer.save()
}

const list = async (perPage, page) => {
    return new Promise((resolve, reject) => {
        Customer.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec().then(function (customers) {
                resolve(customers)
            })
            .catch(err => {
                reject(err)
            })
    })
}


const getByVendor = async (perPage, page, vendorId) => {
    return new Promise((resolve, reject) => {
       let query = Customer.find({vendorId: vendorId})
            .limit(perPage);
            if(page > 1){
                query.skip(perPage * page)
            }
            
            query.exec().then(function (customers) {
                resolve(customers)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const findByEmail = async (email) => {
    return Customer.findOne({ email: email })
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

const patchCustomer = (id, customerData) => {
    return Customer.findOneAndUpdate({
        _id: id
    }, customerData);
};

const removeById = (customerId) => {
    return new Promise((resolve, reject) => {
        Customer.deleteMany({_id: customerId}, (err) => {
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
    createCustomer,
    list,   
    getByVendor,
    patchCustomer, removeById
}