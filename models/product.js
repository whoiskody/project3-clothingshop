/* 
 * Place all functions, classes, and/or DB schemas here for a single 
 * model.
 */

/* Step 1
 *
 * TODO: import mongoose connection
 * NOTE: skip this if you are not using mongoose
 *
 */
const mongoose = require('./connection.js')

/* Step 1 alternative
 *
 * TODO: make a global variable to act as an in memory database. 
 * NOTE: doing this WILL NOT persist your data and you will loose
 * your data once you stop running your server.
 *
 */

/* Step 2
 *
 * TODO: create model schema 
 * NOTE: skip this if you are not using mongoose
 *
 */
const ProductSchema = new mongoose.Schema({
 name: String,
 description: String,
 image: String,
 shopId: mongoose.Types.ObjectId
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const ProductCollection = mongoose.model('Product', ProductSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllProduct(shopId) {
  return ProductCollection.find({shopId:shopId})
}

function getProduct(productId) {
  return ProductCollection.findById(productId)
}

function addNewProduct(shopId, productObject) {
  productObject.shopId = shopId
  return ProductCollection.create(productObject)
}

function updateProduct(productId, updatedProduct) {
  return ProductCollection.findByIdAndUpdate(productId, updatedProduct, {new: true})
}

function deleteProduct(productId) {
  return ProductCollection.findByIdAndDelete(productId)
}

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllProduct,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct

}
