/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class Shops extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        shops: [],
        isNewFormDisplayed: false,
        newShop: {
            name: '',
            description: ''
        }
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        this.getAllShops()
    }

    getAllShops() {
        axios.get('/api/shops')
        .then((res) => {
            this.setState({shops: res.data})
    })
}

handleToggleNewForm = () => {
    this.setState((state) => {
        return {isNewFormDisplayed: !state.isNewFormDisplayed}
        
    })
}

handleInputChange = (event) => {
    const copiedShop = {...this.state.newShop}
    copiedShop[event.target.name] = event.target.value

    this.setState({newShop: copiedShop})
}

handleSubmit = (event) => {
    event.preventDefault()

    axios.post('/api/shops', this.state.newShop)
        .then(() => {
            this.setState({isNewFormDisplayed: false})
            this.getAllShops()
        })
}

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        let shopsList = this.state.shops.map((shop) => {
            return (
                <Link 
                    key={shop._id} 
                    to={`/shops/${shop._id}`}>

                    {shop.name} 
                </Link>
            )
        })
        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-shop-name">Shop Name</label>
                    <input 
                        type="text"
                        name="name"
                        id="new-shop-name"
                        onChange={this.handleInputChange}
                        value={this.state.newShop.name}
                    />
                    <label htmlFor="new-shop-description">Shop Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="new-shop-description"
                        onChange={this.handleInputChange}
                        value={this.state.newShop.description}
                    />

                    <input type="submit" value="Add Shop"/>
                </form>
            : <div>
                <button onClick={this.handleToggleNewForm}>Create New Shop</button>
            <div>
                {/* Accessing the value of message from the state object */}
                <h1>Shop List</h1>
                {shopsList}
            </div>
              </div>
        )
    }
}
