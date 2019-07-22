import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class SingleShop extends Component {
    state = {
        shop: {},
        isEditFormDisplayed: false,
        redirectToHome: false
    }

    componentDidMount () {
        console.log(this.props.match.params.shopId)
        axios.get(`/api/shops/${this.props.match.params.shopId}`)
            .then((res) => {
                this.setState({shop: res.data})
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
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }
        return (
            this.state.isEditFormDisplayed
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
            : <div>
                <button onClick={this.handleToggleEditForm}>Edit Shop</button>
                    <button onClick={this.handleDeleteShop}>Delete Shop</button>
                    <h2>{this.state.shop.name}</h2>
                    <p>{this.state.shop.description}</p>
            </div>
        )
    }
}
