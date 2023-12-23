export const hasValidFields = (req, res, next) => {
    let errors:String[] = []
    if(req.body){
        if(!req.body.firstName || !req.body.lastName){
            errors.push('Please provide your name')
        }

        if(!req.body.address){
            errors.push('Please provide your address')
        }

        if(!req.body.phone){
            errors.push('Please the phone number is required')
        }

        if(errors.length){
            return res.status(400).send({
                errors: errors.join(',')
            })
        }else{
            next()
        }
    }
}