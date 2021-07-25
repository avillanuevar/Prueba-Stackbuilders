import React, { Component } from "react";
import entitiesService from "../src/service/entities.service.js";

import HomePage from './homePage.js'

class App extends Component {
  constructor() {
    super();
    this.state = { entities: null };
    this._service = new entitiesService();
  }


  fetchEnitites = () => {
    if (this.state.entities === null) {
      this._service
        .getEntities()
        .then(fetchEntities => {
          this.setState({ entities: fetchEntities.data.data });
        })
        .catch(err => {
          this.setState({ entities: null });
          console.log({ err });
        });
    }
  };

  render() {
    this.fetchEnitites();
    return (
        <HomePage></HomePage>
    );
  }
}

export default App;