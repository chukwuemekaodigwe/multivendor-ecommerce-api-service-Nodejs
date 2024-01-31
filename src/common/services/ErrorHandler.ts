import { ErrorRequestHandler } from 'express'
import config from '../config/env.config'

/**
 * 500 response & log when errors are raised.
 */
const errorHandler: ErrorRequestHandler = (err, req, res) => {
   
    return res.status(500)
    .send({
        message: config.nodeEnv === 'production' ?
            'unknown error' :
            `${err}`
    })
}

export default errorHandler