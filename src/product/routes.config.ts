import ProductController from './controllers/product.controller'
import ValidationMiddleware from '../common/middlewares/auth.validation.middleware'
import PermissionMiddleware from '../common/middlewares/auth.permission.middleware'
import ProductMiddleware from './middleware/product.middleware'
import Levels from '../common/config/permissionLevel'
import multer from 'multer'
const upload = multer({'dest': './uploads'})


const routes = (app) => {
    app.post('/products/new_product', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProductMiddleware.hasValidFields,
        ProductController.insert
    ])

    app.get('/products', [
        ValidationMiddleware.isRequestValid,
        ProductController.getList
    ])

    app.patch('/products/:productId/update', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProductMiddleware.hasValidFields,
        ProductController.updateProduct

    ])

    app.delete('/products/:productId/delete', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(Levels.VENDOR),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProductMiddleware.hasValidFields,
        ProductController.removeProduct

    ])
    
}

export default routes