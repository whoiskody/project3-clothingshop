import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class Product extends Component {
    state = {
        isEditFormDisplayed: false,
        product: []
    }

    componentDidMount() {
        axios.get(`/api/shops/${this.props.match.params.shopId}/products/${this.props.match.params.productId}`)
            .then((response) => {
                this.setState({
                    product: response.data
                })
            })
    }

    handleDeleteProduct = () => {
        axios.delete(`/api/shops/${this.props.match.params.shopId}/products/${this.props.match.params.productId}`)
        .then(() => {
            this.setState({redirectToHome: true})
        })
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/shops/${this.state.shop._id}/products/${this.props.match.params.productId}`, this.state.product)
            .then((res) => {
                this.setState({
                    shop: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    render() {

        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div>

            {this.state.isEditFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="product-name">Product Name</label>
                    <input 
                        type="text" 
                        id="product-name" 
                        name="name" 
                        onChange={this.handleInputChange}
                        value={this.state.product.name}
                    />
                    <label htmlFor="product-description">Product Description</label>
                    <input 
                        type="text" 
                        id="product-description" 
                        name="description" 
                        onChange={this.handleInputChange}
                        value={this.state.product.description}
                    />
                    <label htmlFor="product-image">Product Image</label>
                    <input 
                        type="text"
                        name="image"
                        id="product-image"
                        onChange={this.handleInputChange}
                        value={this.state.product.image}
                    />

                    <input type="submit" value="Update Product"/>
                </form>
             :<div>
                 <button onClick={this.handleToggleEditForm}>Edit Product</button>
             </div>
            }
            
            <div>
                <button onClick={this.handleDeleteProduct}>Delete Product</button>
                <img src={this.state.product.image}/>
                <h1>{this.state.product.name}</h1>
                <p>{this.state.product.description}</p>
            </div>
            </div>
        )
    }
}
