import React from "react"
import ReactDOM from "react-dom"

import "./styles.css"

class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: props.searchTerm
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(evt) {
    this.setState({ searchTerm: evt.target.value })
    console.log(evt.target.value)
  }

  render() {
    return (
      <form>
        <input
          className="search-box"
          type="text"
          name="searchTerm"
          placeholder="search something"
          value={this.state.searchTerm}
          onChange={this.handleTextChange}
        />
      </form>
    )
  }
}

class MovieList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="movie-section">
        <div className="movie-card">
          <img
            className="movie-card-image"
            src="https://uploads.codesandbox.io/uploads/user/f752eb5a-ad47-4d7b-92c4-9aaf1424ed51/faIB-hero-pie.jpg"
            alt="hero of the movie"
          />
          <div className="movie-card-title">Movie Title</div>
          <div className="movie-card-description">
            Bacon ipsum dolor amet sausage brisket biltong kielbasa kevin pig drumstick boudin capicola burgdoggen doner
            porchetta shank spare ribs.
          </div>
        </div>
        <div className="movie-card">
          <img
            className="movie-card-image"
            src="https://uploads.codesandbox.io/uploads/user/f752eb5a-ad47-4d7b-92c4-9aaf1424ed51/faIB-hero-pie.jpg"
            alt="hero of the movie"
          />
          <div className="movie-card-title">Movie Title</div>
          <div className="movie-card-description">
            Bacon ipsum dolor amet sausage brisket biltong kielbasa kevin pig drumstick boudin capicola burgdoggen doner
            porchetta shank spare ribs.
          </div>
        </div>
        <div className="movie-card">
          <img
            className="movie-card-image"
            src="https://uploads.codesandbox.io/uploads/user/f752eb5a-ad47-4d7b-92c4-9aaf1424ed51/faIB-hero-pie.jpg"
            alt="hero of the movie"
          />
          <div className="movie-card-title">Movie Title</div>
          <div className="movie-card-description">
            Bacon ipsum dolor amet sausage brisket biltong kielbasa kevin pig drumstick boudin capicola burgdoggen doner
            porchetta shank spare ribs.
          </div>
        </div>
      </div>
    )
  }
}

class MovieApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: "",
      isLoaded: false
    }
  }

  render() {
    return (
      <div className="MovieApp">
        <SearchBox searchTerm={this.state.searchTerm} />
        <h1 className="popular-heading">Popular right now</h1>
        <MovieList />
      </div>
    )
  }
}

ReactDOM.render(<MovieApp />, document.getElementById("root"))
