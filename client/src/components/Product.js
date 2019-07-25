import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class Product extends Component {
    state = {
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

    render() {

        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            
            <div>
                <button onClick={this.handleDeleteProduct}>Delete Product</button>
                <img src={this.state.product.image}/>
                <h1>{this.state.product.name}</h1>
                <p>{this.state.product.description}</p>
            </div>
        )
    }
}
