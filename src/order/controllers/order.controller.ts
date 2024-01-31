import { getRandomValues } from "crypto";
import customerModel from "../../customer/models/customer.model";
import orderstatus from "../../orderstatus/models/orderstatus";
import outboundModel from "../../outbound/models/outbound.model";
import orderModel from "../models/order.model";
import { ExpressValidator } from "express-validator";
export default {

    /**
     * @api {post} Creates new order
     * @apiName CreateOrder
     * @apiGroup Order
     * @apiBody {Number} grossTotal Order sum of product price and quantity 
     * @apiBody {Number} totalPaid optional
     * @apiBody {Object[]} Products array of ordered products. See product module for more
     * @apiBody {string} firstName
     * @apiBody {string} lastName
     * @apiBody {String} address Customer address
     * @apiBody {string} country customer country
     * @apiBody {string} [email] optional customer country
     * @apiBody {string} phoneNo customer phone No
     * @apiBody {string} status order status either delivered | pending | shipped
     * @apiBody {String} city customer city of residence
     * @apiParam {String} Vendor's Special key
     * @apiSuccess {String} trackingId This order tracking id
     * @apiSuccess {String} invoiceId  Unique transaction Id for this order
     * @apiError {Object} [Object] response containing the error codes and status
     */

    insert: async (req, res, next) => {
        const data = req.body
        data.vendorId = req.jwt.userId
        data.trackingId = 'HK' + getRandomValues(new Uint32Array(1))[0]
        data.invoiceId = new Date().getTime()
        const output = await orderModel.insertOrder(data).then(result => {
                data.products.map(el => {
                    outboundModel.createOutbound(
                        {
                            orderId: result._id,
                            productId: el.id,
                            quantity: el.quantity,
                            costprice: el.costprice,
                            sellingprice: el.sellingprice,
                            vendorId: data.vendorId,
                            customerId: data.customerId
                        }
                    )
                })
                
            return result
        })

        res.status(201).send(output)
    },

    getList: async (req, res, next) => {
        let page = req.body.page ? req.page : 1
        const r = await orderModel.list(25, page, req.jwt.userId)
        if (!r) return res.status(200).send('No records yet')
        return res.status(200).send(r)

    },

    delete: async (req, res, next) => {
        const order = req.params.id
        orderModel.deleteOrder(order).then(() => {
            res.status(200).send({
                message: 'successfully deleted',
                statusCode: 200
            })
        })
            .catch((err) => {
                next(err)
            })


    },

    getByTrackingId: async (req, res, next) => {
        const id = req.params.trackingId
        await orderModel.getByTrackingId(id).then((r) => {
            res.status(200).send({
                message: 'successfully found',
                data: r
            })

        })
            .catch((err) => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await orderModel.getDetailledById(id).then(r => {
            if (!r) return res.status(404).send({ 'message': 'order not found' })
            res.status(200).send({
                message: 'found',
                data: r
            })
        })
            .catch(err => {
                next(err)
            })
    },

    getByInvoice: async (req, res, next) => {
        const id = req.params.invoiceId
        await orderModel.getByInvoiceId(id).then(r => {
            if (r) {
                res.status(200).send({
                    message: 'found',
                    data: r
                })
            } else {
                res.status(404).send({
                    message: 'Order not found'
                })
            }
        })
    }
}