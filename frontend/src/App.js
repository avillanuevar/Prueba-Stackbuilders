import React, { Component } from "react";
import entitiesService from "./service/entities.service.js";

import HomePage from './pages/homePage/homePage.js'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { entities: [] };
    this._service = new entitiesService();
  }

  async componentDidMount() {
      await this._service
        .getEntities()
        .then(fetchEntities => {
          this.setState({ entities: fetchEntities.data.data });
        })
        .catch(err => {
          this.setState({ entities: [] });
          console.log({ err });
        });
  }

  render() {
    return (
      <section className='app-body'>
        <div className='blue-decor'></div>
        <div className='orange-decor'></div>
        <HomePage entities = {this.state.entities}></HomePage>
      </section>  
        
    );
  }
}

export default App;
