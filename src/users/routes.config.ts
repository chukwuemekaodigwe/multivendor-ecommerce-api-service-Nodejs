import UsersController from './controllers/users.controller'
import PermissionMiddleware from '../common/middlewares/auth.permission.middleware'
import ValidationMiddleware from '../common/middlewares/auth.validation.middleware'
import {IsEmailUsed} from '../authorization/middlewares/verify.user.middleware'
import config from '../common/config/env.config'

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

const routesConfig = function (app) {
    app.post('/vendor/new_vendor', [
        IsEmailUsed,
        UsersController.insert
    ]);

    app.post('/create/admin', [
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        IsEmailUsed,
        UsersController.insertAdmin,
        
    ]);

    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
      //  PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.list
    ]);
    app.get('/vendor/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.patch('/vendor/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);

    app.delete('/vendor/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.removeById
    ]);4

    app.post('/vendor/update_profile', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.updateProfile
    ])

    app.post('/vendor/changepassword',[

    ])

};

export default routesConfig

