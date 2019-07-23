/* Step 1 import express
 *
 */
const express = require('express')

/* Step 2
 *
 * Import the api files from the models
 *
 * TODO: change the file path to the models file you'll need to use.
 * TODO: rename this from `templateApi` to something more sensible (e.g:
 * `shopsAPI`)
 *
 * NOTE: You may need to import more than one API to create the 
 * controller you need.
 * 
 */
const productApi = require('../models/product.js')

/* Step 3 
 * 
 * Create a new router.
 *
 * the router will "contain" all the request handlers that you define in this file.
 * TODO: rename this from templateRouter to something that makes sense. (e.g:
 * `shopRouter`)
 */
const productRouter = express.Router({mergeParams:true})

/* Step 4
 * 
 * TODO: Put all request handlers here
 */

/* Step 5
 *
 * TODO: delete this handler; it's just a sample
 */ 
productRouter.get('/', (req, res) => {
  productApi.getAllProduct(req.params.shopId)
    .then((product) => {
      console.log(product)
      res.json(product)
    })
  
})

productRouter.get('/:productId', (req,res) => {
  productApi.getProduct(req.params.productId)
    .then((product) => {
      res.json(product)
    })
})

productRouter.post('/', (req, res) => {
  productApi.addNewProduct(req.params.shopId, req.body)
    .then((product) => {
      res.json(product)
    })
})

productRouter.put('/:productId', (req, res) => {
  productApi.updateProduct(req.params.productId, req.body)
    .then((updatedProduct) => {
      res.json(updatedProduct)
    })
})

productRouter.delete('/:productId', (req,res) => {
  productApi.deleteProduct(req.params.productId, req.body)
  .then((deletedProduct) => {
    res.json(deletedProduct)
  })
})

/* Step 6
 *
 * Export the router from the file.
 *
 */
module.exports = {
  productRouter
}
