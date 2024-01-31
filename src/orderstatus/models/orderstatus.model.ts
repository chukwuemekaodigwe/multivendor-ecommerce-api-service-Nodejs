import BaseModel from '../../common/models/BaseModel';

export default class OrderStatusModel extends BaseModel {
    constructor() {
        super('orderstatus')
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

}
