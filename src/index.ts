import ('./common/services/mongoose.service')
import cors from 'cors';
import express from 'express';
import swaggerJsdocs from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import SwaggerSpecs from './common/config/swagger.config'

// import modules routes
import auth from './authorization/routes.config'
import admin from './users/routes.config'
import dash from './dashboard/routes.config'
import product from './product/routes.config'
import orders from './order/routes.config'
import orderstatus from './orderstatus/models/orderstatus'
import config from './common/config/env.config';
import errorHandler from './common/services/ErrorHandler';
import fourOhFour from './common/services/fourOfourError';
const app = express()
import('./common/services/email.service2')

// Swagger configuration

//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SwaggerSpecs))
app.use('/api-docs', (req, res) => import('./common/config/apidoc_generator'))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Content-Type', 'application/json')
    res.header('Accept', 'application/json')
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

//app.use(multer())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(cors({
    // @ts-ignore no-implicit-any
    origin: config.clientCorsOrigins[config.nodeEnv] ?? '*'
}))

//app.use(helmet())

// Apply routes before error handling
auth(app)
admin(app)
product(app)
orders(app)
//orderstatus(app)


// Apply error handling last
app.use(fourOhFour)
app.use(errorHandler)


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});

