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
const shopApi = require('../models/shop.js')

/* Step 3 
 * 
 * Create a new router.
 *
 * the router will "contain" all the request handlers that you define in this file.
 * TODO: rename this from templateRouter to something that makes sense. (e.g:
 * `shopRouter`)
 */
const shopRouter = express.Router()

/* Step 4
 * 
 * TODO: Put all request handlers here
 */

/* Step 5
 *
 * TODO: delete this handler; it's just a sample
 */ 
shopRouter.get('/', (req, res) => {
  shopApi.getAllShops()
    .then((shops) => {
      res.json(shops)
    })
  
})

shopRouter.get('/:shopId', (req,res) => {
  shopApi.getShop(req.params.shopId)
    .then((shop) => {
      res.json(shop)
    })
})

shopRouter.post('/', (req, res) => {
  shopApi.addNewShop(req.body)
    .then((shop) => {
      res.json(shop)
    })
})

/* Step 6
 *
 * Export the router from the file.
 *
 */
module.exports = {
  shopRouter
}
