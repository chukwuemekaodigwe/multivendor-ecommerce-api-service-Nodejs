import OrderController from './controllers/order.controller'
import CustomerController from '../customer/controllers/customer.controller'
import ValidationMiddleware from '../common/middlewares/auth.validation.middleware'
import PermissionMiddleware from '../common/middlewares/auth.permission.middleware'
import { validateOrder } from './middleware/orderValidator'
import Levels from '../common/config/permissionLevel'

const routes = (app) => {
    app.post('/orders/new_order', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.CUSTOMER),
        validateOrder,
        OrderController.insert
    ])

    app.get('/orders', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        OrderController.getList
    ])

    app.post('/orders/checkout', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.CUSTOMER),
        CustomerController.insert
    ])


    /**
     * @api
     * For accessing a single order by its datatable id
     */
    app.get('/orders/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        OrderController.getById
    ])

    /**
     * For accessing order through their tracking Id. 
     * This is accessible to store visitors
     */
    app.post('/orders/:trackingId', [
        ValidationMiddleware.isRequestValid,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.CUSTOMER),
        OrderController.getByTrackingId
    ])

    /**
     * Accessing Order through the OrderId generated after purchase
     */
    app.post('/orders/orderbyinvoice/:invoiceId', [
        ValidationMiddleware.isRequestValid,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.CUSTOMER),
        OrderController.getByInvoice
    ])

    // app.patch('/orders/:id', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(levels.VENDOR),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     OrderController.update
    // ])

    app.delete('/orders/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        OrderController.delete
    ])
}

export default routes