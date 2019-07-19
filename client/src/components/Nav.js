import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <nav>
          <div>
              <ul>
                  <Link to="/">Shop</Link>
                  <Link to="/cart">Cart</Link>
              </ul>
          </div>
        </nav>
        )
    }
}
