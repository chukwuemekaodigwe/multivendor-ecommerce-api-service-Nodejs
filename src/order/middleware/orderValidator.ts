import { ExpressValidator } from "express-validator"
const { body, validationResult, matchedData } = new ExpressValidator()

export function validateOrder(req, res, next) {
    body('*').trim().notEmpty().withMessage('Please supply all the fields')
    body('grossTotal').isNumeric().withMessage('GrossTotal field required')
    body('products').isArray().withMessage('Enclose products in an arrays')
    body('products[*].id').isMongoId().withMessage('Please select a product')
    body('products[].*.quantity').isNumeric().withMessage('Product quantity is required')
    body('products[].*.costprice').isNumeric().withMessage('Product cost price is required')
    body('products[].*.sellingprice').isNumeric().withMessage('Product seeling price is required')

    const result = validationResult(req)
    if (result.isEmpty()) {
        next()
    } else {
        res.send({ errors: result.array() })
    }
}

export function validateCheckout(req, res, next) {
    body('*').trim().notEmpty().withMessage('Please supply all the fields')
    body('firstName').isString().withMessage('Please provide your firstname')
    body('lastName').isString().notEmpty().withMessage('Please provide your last name')
    body('address').isString().withMessage('Please provide your address')
    body('city').isString().withMessage('Please provide the city')
    body('country').withMessage('Please the country field is important')
    body('phoneNo').isMobilePhone('any').withMessage('please provide your phone in international format')
    body('orderId').isMongoId().withMessage('Please provide the order id')
    body('email').isEmail().optional().withMessage('Please provide a real email address')

    const result = validationResult(req)
    if (result.isEmpty()) {
        next(matchedData(req))
    } else {
        res.send({ errors: result.array() })
    }

}

export function validateBillling(req, res, next){
    body('*').trim().notEmpty().withMessage('Please supply all the fields')
    body('amountPaid').isString().withMessage('Please provide your firstname')
    body('PaymentMethod').isString().notEmpty().withMessage('Please provide your last name')
    body('customerId').isMongoId().withMessage('Please provide the customer id')
    body('orderId').isMongoId().withMessage('Please provide the order id')

    const result = validationResult(req)
    if (result.isEmpty()) {
        next(matchedData(req))
    } else {
        res.send({ errors: result.array() })
    }

}

