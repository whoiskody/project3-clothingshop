import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class SingleShop extends Component {
    state = {
        shop: {},
        isEditFormDisplayed: false,
        redirectToHome: false,
        products:[],
        newProduct: {
            name: '',
            description: ''
        }
    }

    componentDidMount () {
        console.log(this.props.match.params.shopId)
        axios.get(`/api/shops/${this.props.match.params.shopId}`)
            .then((res) => {
                this.setState({shop: res.data})
                this.getProductForShop()
            })
            
    }

    handleToggleNewProductForm = () => {
        this.setState((state) => {
            return {isNewProductFormDisplayed: !state.isNewProductFormDisplayed}
            
        })
    }

    handleInputChange = (event) => {
        const copiedShop = {...this.state.shop}
        copiedShop[event.target.name] = event.target.value
        this.setState({shop: copiedShop})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/shops/${this.state.shop._id}`, this.state.shop)
            .then((res) => {
                this.setState({
                    shop: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleDeleteShop = () => {
        axios.delete(`/api/shops/${this.state.shop._id}`)
        .then(() => {
            this.setState({redirectToHome: true})
        })
    }

    getProductForShop = () => {
        axios.get(`/api/shops/${this.props.match.params.shopId}/product`)
        .then((response) => {
            this.setState({
                products: response.data
            })
            
        })
    }

    handleSubmitNewForm = (event) => {
        event.preventDefault()

    axios.post('/api/shops/:shopId/product', this.state.newProduct)
        .then(() => {
            this.setState({isNewProductFormDisplayed: false})
            this.getAllProduct()
        })
    }

    render() {

        let productList = this.state.products.map((product) => {
            return (
                <Link 
                    key={product._id} 
                    to={`/product/${product.productId}`}>
                    {product.name} 
                </Link>
            )
        })
        
        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }
        return (
            
        <div>

            {this.state.isEditFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="shop-name">Shop Name</label>
                    <input 
                        type="text" 
                        id="shop-name" 
                        name="name" 
                        onChange={this.handleInputChange}
                        value={this.state.shop.name}
                    />
                    <label htmlFor="shop-description">Shop Description</label>
                    <input 
                        type="text" 
                        id="shop-description" 
                        name="description" 
                        onChange={this.handleInputChange}
                        value={this.state.shop.description}
                    />

                    <input type="submit" value="Update Shop"/>
                </form>
             :<div>
                 <button onClick={this.handleToggleEditForm}>Edit Shop</button>
             </div>
            }

             {this.state.isNewProductFormDisplayed
                ? <form onSubmit={this.handleSubmitNewForm}>
                    <label htmlFor="new-product-name">Product Name</label>
                    <input 
                        type="text"
                        name="name"
                        id="new-product-name"
                        onChange={this.handleInputChange}
                        value={this.state.products.name}
                    />
                    <label htmlFor="new-product-description">Product Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="new-product-description"
                        onChange={this.handleInputChange}
                        value={this.state.products.description}
                    />

                    <input type="submit" value="Add Product"/>
                </form>
            : <div>
                <button onClick={this.handleToggleNewProductForm}>Create New Product</button>
            <div>
            


                <button onClick={this.handleToggleEditForm}>Edit Shop</button>
                    <button onClick={this.handleDeleteShop}>Delete Shop</button>
                    <h2>{this.state.shop.name}</h2>
                    <p>{this.state.shop.description}</p>
                    {productList}
            </div>
            </div>}
        </div>
        )
    }
}
