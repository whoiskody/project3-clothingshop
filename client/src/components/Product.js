import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import './Product.css';

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

        axios.put(`/api/shops/${this.props.match.params.shopId}/products/${this.props.match.params.productId}`, this.state.product)
            .then((res) => {
                this.setState({
                    shop: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    handleInputChange = (event) => {
        const copiedProduct = {...this.state.product}
        copiedProduct[event.target.name] = event.target.value
        this.setState({product: copiedProduct})
    }

    render() {

        if(this.state.redirectToHome) {
            return <Redirect to={`/shops/${this.props.match.params.shopId}`} />
        }

        return (
            <div>

            {this.state.isEditFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <div className="productName" >
                       <label htmlFor="product-name">Product Name</label>
                    <input 
                        type="text" 
                        id="product-name" 
                        name="name" 
                        onChange={this.handleInputChange}
                        value={this.state.product.name}
                    /> 
                    </div>
                    
                    <div className="productDescription">
                       <label htmlFor="product-description">Product Description</label>
                    <input 
                        type="text" 
                        id="product-description" 
                        name="description" 
                        onChange={this.handleInputChange}
                        value={this.state.product.description}
                    /> 
                    </div>
                    
                    <div className="productImage">
                        <label htmlFor="product-image">Product Image</label>
                    <input 
                        type="text"
                        name="image"
                        id="product-image"
                        onChange={this.handleInputChange}
                        value={this.state.product.image}
                    />
                    </div>
                    
                    <div className="updateProduct" >
                       <input type="submit" value="Update Product"/> 
                    </div>
                    
                </form>
             :<div className="press">
                 <button onClick={this.handleToggleEditForm}>Edit Product</button>
                 <button onClick={this.handleDeleteProduct}>Delete Product</button>
             </div>
            }
            
            <div className="product">
                
                <img src={this.state.product.image}/>
                <h1>{this.state.product.name}</h1>
                <p>{this.state.product.description}</p>
            </div>
            </div>
        )
    }
}
