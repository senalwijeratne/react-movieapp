import React from "react"
import ReactDOM from "react-dom"

import "./styles.css"

class MovieApp extends React.Component {
  render() {
    return (
      <div className="MovieApp">
        <h1>Hello World!</h1>
      </div>
    )
  }
}

ReactDOM.render(<MovieApp />, document.getElementById("root"))
