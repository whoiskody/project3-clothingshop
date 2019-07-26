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
                      <img src= "data:image/png;base64,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" width="30" height="30" />
                  <Link to="/">Home</Link>
                  {/* <Link to="/about">About</Link> */}
                  </a>
              </ul>
          </div>
        </nav>
        )
    }
}
