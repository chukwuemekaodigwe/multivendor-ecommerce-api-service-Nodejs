import BaseModel from '../../common/models/BaseModel';

export default class OrderModel extends BaseModel {
    constructor() {
        super('order')
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

    
}
