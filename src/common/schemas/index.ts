import Billing from "../schemas/billing"
import User from "../schemas/user"
import Customer from "../schemas/customer"
import Order from "../schemas/order"
import OrderStatus from "../schemas/order_status"
import Outbound from "../schemas/outbound"
import Product from "../schemas/product"

const GetModel = (model) => {
    switch (model) {
        case 'user':
            return User;
            break;

        case 'product':
            return Product;
            break;

        case 'order':
            return Order;
            break;

        case 'customer':
            return Customer;
            break;

        case 'outbound':
            return Outbound;
            break;

        case 'orderstatus':
            return OrderStatus;
            break;

        case 'billing':
            return Billing;
            break;


        default:
            throw new Error('Unknown Model name')
            break;
    }
}

export default GetModel