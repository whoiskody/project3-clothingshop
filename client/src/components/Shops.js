/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Shops.css';

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
            description: '',
            image: ''
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
                    to={`/shops/${shop._id}`}
                    className="shop-card"
                >
                    <div className="ui cards">
                        <div className="image">
                            <img height="125" width="290" src={shop.image} />
                        </div>
                        <div className="content">
                            <p className="header">{shop.name}</p>
                        </div>
                    </div>
                    {/* <img height="125" width="290" src ={shop.image} />
                    {shop.name} */}
                </Link>
            )
        })
        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <div className="shopName" >
                       <label htmlFor="new-shop-name">Shop Name </label>
                    <input 
                        type="text"
                        name="name"
                        id="new-shop-name"
                        onChange={this.handleInputChange}
                        value={this.state.newShop.name}
                    /> 
                    </div>
                    
                    <div className="shopDescription">
                        <label htmlFor="new-shop-description">Shop Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="new-shop-description"
                        onChange={this.handleInputChange}
                        value={this.state.newShop.description}
                    />
                    </div>
                    
                    <div className="shopImage">
                        <label htmlFor="new-shop-image">Shop Image</label>
                    <input 
                        type="text"
                        name="image"
                        id="new-shop-image"
                        onChange={this.handleInputChange}
                        value={this.state.newShop.image}
                    />
                    </div>
                    
                    <div className="shopAdd">
                       <input type="submit" value="Add Shop"/> 
                    </div>
                    
                </form>
            : <div>
                
            <div className= "board">
                <button onClick={this.handleToggleNewForm}>Add Shop</button>
                {/* Accessing the value of message from the state object */}
                <h1>Little Five Points</h1>
            </div>
            <div className= "listy">
                    {shopsList}
            </div>
            </div>
        )
    }
}
