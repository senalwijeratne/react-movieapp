import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

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
          placeholder="search"
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

    this.state = {
      popularIsLoaded: false
    }

    this.retrivePopular = this.retrivePopular.bind(this)
  }

  componentDidMount() {
    this.retrivePopular()
  }

  retrivePopular() {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=885130303f08da8840fcee905162aaac&language=en-US&sort_by=popularity.desc"
      )
      .then(response => {
        this.setState({
          popularMovieData: response.data.results.slice(0, 3),
          popularIsLoaded: true
        })
      })
  }

  render() {
    if (this.state.popularIsLoaded) {
      return (
        <div className="movie-section">
          <div className="movie-card animated zoomIn">
            <img
              className="movie-card-image"
              src={`${this.props.imageBaseURL + this.props.backdropSize + this.state.popularMovieData[0].backdrop_path}`}
              alt="hero of the movie"
            />
            <div className="movie-card-title">{this.state.popularMovieData[0].title}</div>
            <div className="movie-card-description">{this.state.popularMovieData[0].overview}</div>
          </div>
          <div className="movie-card animated zoomIn">
            <img
              className="movie-card-image"
              src={`${this.props.imageBaseURL + this.props.backdropSize + this.state.popularMovieData[1].backdrop_path}`}
              alt="hero of the movie"
            />
            <div className="movie-card-title">{this.state.popularMovieData[1].title}</div>
            <div className="movie-card-description">{this.state.popularMovieData[1].overview}</div>
          </div>
          <div className="movie-card animated zoomIn">
            <img
              className="movie-card-image"
              src={`${this.props.imageBaseURL + this.props.backdropSize + this.state.popularMovieData[2].backdrop_path}`}
              alt="hero of the movie"
            />
            <div className="movie-card-title">{this.state.popularMovieData[2].title}</div>
            <div className="movie-card-description">{this.state.popularMovieData[2].overview}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      )
    }
  }
}

class MovieApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: "",
      imageBaseURL: "",
      backdropSize: ""
    }

    this.getConfigFromAPI = this.getConfigFromAPI.bind(this)
  }

  componentDidMount() {
    this.getConfigFromAPI()
  }

  getConfigFromAPI() {
    axios.get("https://api.themoviedb.org/3/configuration?api_key=885130303f08da8840fcee905162aaac").then(response => {
      this.setState({
        imageBaseURL: response.data.images.secure_base_url,
        backdropSize: response.data.images.backdrop_sizes[1]
      })
    })
  }

  render() {
    return (
      <div className="MovieApp">
        <SearchBox searchTerm={this.state.searchTerm} />
        <h1 className="popular-heading">Popular right now</h1>
        <MovieList imageBaseURL={this.state.imageBaseURL} backdropSize={this.state.backdropSize} />
      </div>
    )
  }
}

ReactDOM.render(<MovieApp />, document.getElementById("root"))
