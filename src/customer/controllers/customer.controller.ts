import { resolve } from 'node:path'
import CustomerModel from '../models/customer.model'
import orderstatus from '../../orderstatus/models/orderstatus'
import OrderModel from '../../order/models/order.model'
import OutboundModel from '../../outbound/models/outbound.model'

export default {
    insert: async (req, res, next) => {
        const body = req.body
        body.vendorId = req.jwt.userId

        await CustomerModel.createCustomer(body).then(async (result) => {
            orderstatus.createOrderStatus({
                vendorId: body.vendorId,
                orderId: body.orderId,
                customerId: result.id,
                status: body.status
            })

            await OrderModel.patchOrder(body.orderId, { customerId: result.id })
            await OutboundModel.patchOutbound(body.orderId, { customerId: result.id })
            res.status(201).send({ 'message': 'Order updated', 'newCustomer': result })
        })
            .catch(err => {
                res.status(500).send({ error: err })
                //next(err)
            })
    },

    getList: (req, res, next) => {
        let page = req.perPage ? req.perPage : 1
        let vendor = req.jwt.userId

        CustomerModel
            .getByVendor(25, page, vendor)
            .then((result) => {
                res.status(200).send({ result: result })
            })
            .catch((err) => {
                res.status(500).send({ error: err })
            })

    },

    getById: (req, res, next) => {
        let customer = req.params.customerId
        CustomerModel.findById(customer)
            .then((result) => {
                if (!result) return res.status(404).send({ error: 'customer not found' })
                return res.status(200).send({ message: 'customer found', data: result })
            })
            .catch((err) => {
                res.status(500).send({ error: err })
            })
    },

    updateCustomer: (req, res) => {
        let id = req.params.customerId
        let data = req.body
        if (id) {
            CustomerModel.patchCustomer(id, data)
                .then((result) => {

                    res.status(200).send({ message: 'successfully updated', data: result })
                })
                .catch((err) => {
                    res.status(500).send({ error: err })
                })
        }
    },

    removeCustomer: (req, res) => {
        let id = req.params.customerId
        if (id) {
            CustomerModel.removeById(id).then(result => {
                res.status(200).send({ message: 'customer deleted', data: result })
            })
                .catch(err => {
                    res.status(500).send({ error: err })
                })

        }
    }

}