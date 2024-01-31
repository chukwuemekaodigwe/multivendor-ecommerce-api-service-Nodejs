import { resolve } from 'node:path'
import ProductModel from '../models/product.model'


export default {
    insert : async (req, res, next) => {
        const body = req.body
        body.vendorId = req.jwt.userId
        await ProductModel.insertProduct(body).then(result => {
            res.status(201).send({message: 'New product created', data: result})
        })
            .catch(err => {
                res.status(500).send({ error: err })
                next(err)
            })
    },

    getList: (req, res, next) => {
        let page = req.perPage ? req.perPage : 1
        let vendor = req.jwt.userId

        ProductModel
            .list(25, page, vendor)
            .then((result) => {
                res.status(200).send({ result: result })
            })
            .catch((err) => {
                res.status(500).send({ error: err })
            })

    },

    getById : (req, res, next) => {
        let product = req.params.productId
        ProductModel.findById(product)
        .then((result)=>{
            if(!result) return res.status(404).send({error: 'product not found'})
            return res.status(200).send({message:'product found', data: result})
        })
        .catch((err)=>{
            res.status(500).send({ error: err })
        })
    },

    updateProduct: (req, res) =>{
        let id = req.params.productId
        let data = req.body
        if(id){
            ProductModel.updateProduct(id, data)
            .then((result)=>{
                
                res.status(200).send({ message: 'successfully updated', data: result })
            })
            .catch((err)=>{
                res.status(500).send({ error: err })
            })
        }
    },

    removeProduct: (req, res) => {
        let id = req.params.productId
        if(id){
            ProductModel.deleteProduct(id).then(result=>{
                res.status(200).send({ message: 'product deleted', data: result })
            })
            .catch(err=>{
                res.status(500).send({ error: err })
            })
            
        }
    }

}