import Product from '../../common/schemas/product'

export const insertProduct = async (data) => {
    const product = new Product(data)
    return product.save()
}

const findById = async (id) => {
    return Product.findById(id)
        .then((result) => {
            if (!result) return
            result = result.toJSON();
            delete result._id
            return result
        })
}

const paginate = async (perPage, page, vendor) => {
    return new Promise((resolve, reject) => {
        Product.find({ vendorId: vendor })
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


const list = async (perPage, page, vendor) => {
    return new Promise((resolve, reject) => {
        Product.find({ vendorId: vendor })
            //.limit(perPage)
           // .skip(perPage * page)
            .exec()
            .then((res) => {
                
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

const updateProduct = async (id, data) => {
    return Product.findOneAndUpdate({
        _id: id,

    }, data)
}


const deleteProduct = (id) => {
 return new Promise((resolve, reject) => {
    Product.deleteOne({_id: id}, (err, response)=>{
        if(err){
            reject(err)
        }else{
            resolve(err)
        }
    })
 })   
}


export default {
    insertProduct,
    findById,
    updateProduct,
    deleteProduct,
    list
}


