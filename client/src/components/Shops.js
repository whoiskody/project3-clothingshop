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
export default class HelloWorld extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        message: ''
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        axios.get('/api/helloworld')
            .then((res) => {
                this.setState({message: res.data})
            })
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        // let shopsList = this.state.shops.map((shop) => {
        //     return (
        //         <Link 
        //             key={shop._id} 
        //             to={`/shops/${shop._id}`}>

        //             {shop.name} 
        //         </Link>
        //     )
        // })
        return (
            <div>
                {/* Accessing the value of message from the state object */}
                {/* {shopsList} */}
                <h1>yoyoyoyoyoyo</h1>
            </div>
        )
    }
}
