import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <nav>
          <div>
              <ul>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
              </ul>
          </div>
        </nav>
        )
    }
}
