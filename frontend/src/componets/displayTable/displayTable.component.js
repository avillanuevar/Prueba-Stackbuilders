import React, { Component } from "react";
import "./displayTable.component.css"

class Table extends Component{

    constructor(props){
        super(props)
        this.state = {
            entitiesList: []
        };
    }
    //sets the property entitiesList.
    static getDerivedStateFromProps(props, state) {
        return {entitiesList: props.entities }
      }

    render(){
        let filteredEntities = this.state.entitiesList;
        return (
            <div className='table-scroll'>
                <table>
                <thead>
                    <tr >
                        <th className='center-text'>Position</th>
                        <th className='tilte-width'>Title</th>
                        <th className='center-text'>Points</th>
                        <th className='center-text'>Comments</th>
                    </tr>
                </thead>
                <tbody>
                  {filteredEntities.map((entrie) => {
                      return(
                          <tr key={entrie.rank}>
                              <td className='center-text'>{ entrie.rank }</td>
                              <td className='title-text'>{ entrie.title }</td>
                              <td className='center-text'>{ entrie.points === '' ? '0' : entrie.points }</td>
                              <td className='center-text'>{ entrie.comments === '' ? '0' : entrie.comments }</td>
                          </tr>
                      )
                  })}
                </tbody>
            </table>
            </div>     
            
        );
    }
}
export default Table;