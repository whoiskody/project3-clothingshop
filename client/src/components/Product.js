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

    render() {
        return (
            <div>
                <h1>YEAaaaaaaa</h1>
                <h2>{this.state.product.name}</h2>
            </div>
        )
    }
}
