import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            <nav>
          <div>
              <ul>
                  <a className= "nav">
                  <Link to="/">Home</Link>
                  {/* <Link to="/about">About</Link> */}
                  </a>
              </ul>
          </div>
        </nav>
        )
    }
}
