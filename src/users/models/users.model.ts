import BaseModel from '../../common/models/BaseModel';

export default class OutBoundModel extends BaseModel {
    constructor() {
        super('user')
    }

    public ByVendorId(perpage, page, vendorId){
        return this.paginate(
            {'vendorId': vendorId},
            perpage,
            page
        )
    }

    public ByCustomerId(perpage, page, customerId){
        return this.paginate(
            {'customerId': customerId},
            perpage,
            page
        )
    }

    public ByOrderId(perpage, page, orderId){
        return this.paginate(
            {'orderId': orderId},
            perpage,
            page
        )
    }

    public ByProductId(perpage, page, productId){
        return this.paginate(
            {'productId': productId },
            perpage,
            page
        )
    }

    public updatePassword = (id, password) => {
        return this.update(
            {
            _id: id
        }
        , {$set : {password: password}}
        )
    };
    
    
    public CheckVendorId = (vendorCode) => {
        return new Promise(async(resolve, reject) => {
         this.findOne({'vendorCode': vendorCode})
         .then(res=>{
            if(!res) reject('Invalid Vendor Id')
            resolve(res)
         })
        })
    }
    
}
