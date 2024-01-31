const hasValidFields = (req, res, next) => {
    let errors: String[] = []
if(req.body){
    if (!req.body.name) {
        errors.push('Please provide the product name')
    }

    if (!req.body.picture) {
        errors.push('Product Image required')
    }

    if (!req.body.costprice) {
        errors.push('Product cost price required')
    }

    if (!req.body.sellingprice) {
        errors.push('Product selling price required')
    }

    if (!req.body.description) {
        errors.push('provide a rich, SEO-friendly product description')
    }

    if (req.body.costprice > req.body.sellingprice) {
        errors.push('The costprice is higher then the sellingprice')
    }

    if(errors.length){
        return res.status(400).send({
            errors: errors.join('\n\r')
        })
    }else{
        next()
    }
}else{
    return res.status(400).send({
        errors: 'Form fields missing'
    })
}
}

export default {
    hasValidFields
}