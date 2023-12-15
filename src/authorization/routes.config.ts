import VerifyUserMiddleware from './middlewares/verify.user.middleware'
import AuthorizationController from './controllers/authorization.controller'
import AuthValidationMiddleware from '../common/middlewares/auth.validation.middleware'

const routesConfig = function (app) {

    app.post('/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.refresh_token
    ]);

    app.get('/', async (req, res) => {
        res.send('Page found')
    })
};

export default routesConfig
