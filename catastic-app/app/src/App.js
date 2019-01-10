import React, { Component } from "react";
import Nav from "./components/Nav";
import "./App.css";

const apiConfig = m => ({
  method: m,
  headers: {
    api_key: "g00dLuCk"
  }
});

class App extends Component {
  state = {
    catImg: "",
    catId: "",
    favs: [],
    activeLink: "Home" // default
  };

  componentDidMount() {
    this.getRandomImg();
    this.getFavs();
  }

  getRandomImg = () => {
    fetch("http://localhost:8080/api/images", apiConfig("GET"))
      .then(res => res.json())
      .then(data =>
        this.setState({ catImg: data.image.url, catId: data.image.id })
      );
  };

  getFavs = () => {
    fetch("http://localhost:8080/api/images/fav", apiConfig("GET"))
      .then(res => res.json())
      .then(data => this.setState({ favs: data.images }));
  };

  handleActionClick = action => {
    if (action === "love") {
      this.addToFav(this.state.catId).then(this.getRandomImg());
    } else if (action === "hate") {
      this.getRandomImg();
    }
  };

  handleRemove = id => {
    this.removeFav(id).then(() => {
      this.setState({ favs: this.state.favs.filter(cat => id !== cat.id) });
    });
  };

  onLinkClick = title => this.setState({ activeLink: title });

  addToFav = id => {
    return fetch(
      `http://localhost:8080/api/images/fav/${id}`,
      apiConfig("POST")
    )
      .then(res => res.json())
      .then(data =>
        this.setState({ favs: this.state.favs.concat([data.image]) })
      );
  };

  removeFav = id => {
    return fetch(
      `http://localhost:8080/api/images/fav/${id}`,
      apiConfig("DELETE")
    );
  };

  render() {
    return (
      <div className="App">
        <Nav
          activeLink={this.state.activeLink}
          onLinkClick={this.onLinkClick}
        />

        <div className="container">
          {this.state.activeLink === "Home" && (
            <div className="card">
              <div className="card__img-container">
                <img src={this.state.catImg} alt="" />
              </div>
              <div className="card__actions">
                <button
                  onClick={() => this.handleActionClick("hate")}
                  className="action"
                >
                  <span role="img" aria-label="hate">
                    ❌
                  </span>
                </button>
                <button
                  onClick={() => this.handleActionClick("love")}
                  className="action"
                >
                  <span role="img" aria-label="love">
                    💜
                  </span>
                </button>
              </div>
            </div>
          )}

          {this.state.activeLink === "Favs" && (
            <div>
              <h1>Favorites</h1>

              <div className="fav-list">
                {this.state.favs.map(fav => (
                  <div className="fav-item" key={fav.id}>
                    <img src={fav.url} alt={fav.id} />
                    <button
                      onClick={() => this.handleRemove(fav.id)}
                      className="remove"
                    >
                      <span role="img" aria-label="hate">
                        ❌
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
