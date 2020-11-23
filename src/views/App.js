import React from 'react'
import { Link } from "react-router-dom"

const API_URL = typeof process !== 'undefined' ? process.env.API_URL : '';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { value: "World" }

    fetch(API_URL + '/api').then(res => res.json())
      .then(res => this.setState({ value: res.value }));
  }

  render() {
    return (
      <div>
        Hello{' '}
        <Link to="/other">Other</Link>
        {' '}<input 
          value={this.state.value} 
          onChange={e => this.setState({ value: e.target.value })}
        />
      </div>
    )
  }
}

export default App