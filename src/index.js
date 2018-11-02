import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import "./styles.scss"

class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ""
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleTextChange(evt) {
    this.setState({ searchTerm: evt.target.value })
  }

  handleKeyDown(evt) {
    if (evt.keyCode === 13) {
      this.props.queryMovieAPI("search", this.state.searchTerm)
    }
  }

  render() {
    return (
      <input
        className="search-box"
        type="text"
        name="searchTerm"
        placeholder="search"
        value={this.state.searchTerm}
        onChange={this.handleTextChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

class MovieList extends React.Component {
  componentDidMount() {
    this.props.queryMovieAPI("popular")
  }

  render() {
    if (this.props.isLoaded) {
      return (
        <div className="movie-section">
          {this.props.movieData.map(moviedata => {
            return (
              <div className="movie-card animated zoomIn" key={moviedata.id}>
                <img
                  className="movie-card-image"
                  src={`${this.props.imageBaseURL +
                    this.props.backdropSize +
                    moviedata.backdrop_path}`}
                  alt="hero of the movie"
                />
                <div className="movie-card-title">{moviedata.title}</div>
                <div className="movie-card-description">{moviedata.overview}</div>
              </div>
            )
          })}
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
      imageBaseURL: "",
      backdropSize: "",
      isLoaded: false,
      movieData: ""
    }

    this.getConfigFromAPI = this.getConfigFromAPI.bind(this)
    this.queryMovieAPI = this.queryMovieAPI.bind(this)
  }

  componentDidMount() {
    this.getConfigFromAPI()
  }

  getConfigFromAPI() {
    axios
      .get("https://api.themoviedb.org/3/configuration", {
        params: { api_key: "885130303f08da8840fcee905162aaac" }
      })
      .then(response => {
        this.setState({
          imageBaseURL: response.data.images.secure_base_url,
          backdropSize: response.data.images.backdrop_sizes[1]
        })
      })
  }

  queryMovieAPI(type, searchTerm) {
    if (type === "popular") {
      axios
        .get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "885130303f08da8840fcee905162aaac",
            language: "en-US",
            sort_by: "popularity.desc"
          }
        })
        .then(response => {
          this.setState({
            movieData: response.data.results.slice(0, 6),
            isLoaded: true
          })
        })
    } else if (type === "search") {
      this.setState({
        isLoaded: false
      })
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: "885130303f08da8840fcee905162aaac",
            language: "en-US",
            include_adult: "true",
            query: `${searchTerm}`
          }
        })
        .then(response => {
          console.log(response.data)
          this.setState({
            movieData: response.data.results.slice(0, 6),
            isLoaded: true
          })
        })
    }
  }

  render() {
    return (
      <div className="MovieApp">
        <SearchBox
          isLoaded={this.state.isLoaded}
          movieData={this.state.movieData}
          queryMovieAPI={this.queryMovieAPI}
        />
        <h1 className="popular-heading">Popular right now</h1>
        <MovieList
          imageBaseURL={this.state.imageBaseURL}
          backdropSize={this.state.backdropSize}
          isLoaded={this.state.isLoaded}
          movieData={this.state.movieData}
          queryMovieAPI={this.queryMovieAPI}
        />
      </div>
    )
  }
}

ReactDOM.render(<MovieApp />, document.getElementById("root"))
