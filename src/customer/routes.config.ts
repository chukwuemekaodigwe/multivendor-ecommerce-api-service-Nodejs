import CustomerController from './controllers/customer.controller'
import ValidationMiddleware from '../common/middlewares/auth.validation.middleware'
import PermissionMiddleware from '../common/middlewares/auth.permission.middleware'
import { hasValidFields } from './middleware/customers.middleware'
import Levels from '../common/config/permissionLevel'


const routes = (app) => {
   app.post('/customers/new_customer', [
    hasValidFields,
    CustomerController.insert
   ])

   
    app.get('/customers', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        CustomerController.getList
    ])

    // app.patch('/customers/:customerId/update', [
        
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     hasValidFields,
    //     CustomerController.updateCustomer

    // ])

    // app.delete('/customers/:customerId/delete', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     hasValidFields,
    //     CustomerController.removeCustomer

    // ])
    
}

export default routes