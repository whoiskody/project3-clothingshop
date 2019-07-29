import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import './SingleShop.css';

export default class SingleShop extends Component {
    state = {
        shop: {},
        isEditFormDisplayed: false,
        redirectToHome: false,
        products:[],
        newProduct: {
            name: '',
            description: '',
            image: ''
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
        axios.get(`/api/shops/${this.props.match.params.shopId}/products`)
        .then((response) => {
            this.setState({
                products: response.data
            })
            
        })
    }

    handleSubmitNewForm = (event) => {
        event.preventDefault()

        axios.post(`/api/shops/${this.props.match.params.shopId}/products`, this.state.newProduct)
            .then(() => {
                this.setState({isNewProductFormDisplayed: false})
                this.getProductForShop()
            })
    }

    handleProductInputChange = (event) => {
        console.log(event.target.name)
        const copiedProduct = {...this.state.newProduct}
        copiedProduct[event.target.name] = event.target.value
        this.setState({newProduct: copiedProduct})
    }

    render() {

        let productList = this.state.products.map((product) => {
            return (
                <Link 
                    key={product._id} 
                    to={`/shops/${this.state.shop._id}/products/${product._id}`}>
                    <img src ={product.image} />
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
                    <label htmlFor="shop-image">Shop Image</label>
                    <input 
                        type="text"
                        name="image"
                        id="shop-image"
                        onChange={this.handleInputChange}
                        value={this.state.shop.image}
                    />

                    <input type="submit" value="Update Shop"/>
                </form>
             :<div>
                 <button onClick={this.handleToggleEditForm}>Edit Shop</button>
                 <button onClick={this.handleDeleteShop}>Delete Shop</button>
             </div>
            }

             {this.state.isNewProductFormDisplayed
                ? <form onSubmit={this.handleSubmitNewForm}>
                    <label htmlFor="new-product-name">Product Name</label>
                    <input 
                        type="text"
                        name="name"
                        id="new-product-name"
                        onChange={this.handleProductInputChange}
                        value={this.state.newProduct.name}
                    />
                    <label htmlFor="new-product-description">Product Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="new-product-description"
                        onChange={this.handleProductInputChange}
                        value={this.state.newProduct.description}
                    />
                    <label htmlFor="new-product-image">Product Image</label>
                    <input 
                        type="text"
                        name="image"
                        id="new-product-image"
                        onChange={this.handleProductInputChange}
                        value={this.state.newProduct.image}
                    />

                    <input type="submit" value="Add Product"/>
                </form>
            : <div>
                <button onClick={this.handleToggleNewProductForm}>Create New Product</button>
            <div>
            


                {/* <button onClick={this.handleToggleEditForm}>Edit Shop</button> */}
    
                    <img src={this.state.shop.image}/>
                    <h1>{this.state.shop.name}</h1>
                    <p>{this.state.shop.description}</p>
                    <h2>Product List</h2>
                    <div className= "singleListy">
                        <p>
                           {productList} 
                        </p>
                    </div>
            </div>
            </div>}
        </div>
        )
    }
}
