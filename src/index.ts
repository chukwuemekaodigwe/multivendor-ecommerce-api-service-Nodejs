import ('./common/services/mongoose.service')
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import logging from 'winston';

import auth from './authorization/routes.config'
import admin from './users/routes.config'
import dash from './dashboard/routes.config'

import config from './common/config/env.config';
import errorHandler from './common/services/ErrorHandler';
import fourOhFour from './common/services/fourOfourError';
const app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(cors({
    // @ts-ignore no-implicit-any
    origin: config.clientCorsOrigins[config.nodeEnv] ?? '*'
}))

app.use(helmet())

// Apply routes before error handling
auth(app)
admin(app)
//app.use('/', auth)
//app.use('/admin', admin)
//app.use('/dash', dash)


// Apply error handling last
app.use(fourOhFour)
app.use(errorHandler)


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});

