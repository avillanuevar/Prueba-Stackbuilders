import React, { Component } from "react";
import Table from '../../componets/displayTable/displayTable.component.js'
import "./homePage.css"

class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            entities: [],
            filteredEntities: [],
            pfa: false, // Points Filter Activated
            cfa: false // Comments Filter Activated
        }
    }

    //Initialize the property entities and if it's empty the filteredEntities also.
    static getDerivedStateFromProps(props, state) {
        return state.filteredEntities.length ? {entities: props.entities } : 
            {entities: props.entities, filteredEntities: props.entities };
      }

    //Updates the property filteredEntities when either the points filter or the comments filter is activated.
    componentDidUpdate(prevProps, prevState) {
      if (this.state.pfa !== prevState.pfa || this.state.cfa !== prevState.cfa) {
          const fiterarray = this._fiterByWordCount();
          this.setState({ filteredEntities: fiterarray });
      }
    }

    //Function that changes the value of the properties pfa and cfa depending on the filter that is choosen.
    _fiterActivated = (e) => {
        e.preventDefault();
        const filter = e.currentTarget.value;
        switch (filter) {
            case 'all':
                this.setState({ pfa: false, cfa: false });
                break;
            case 'filter1':
                this.setState({ pfa: false, cfa: true });
                break;
            case 'filter2':
                this.setState({ pfa: true, cfa: false });
                break;    
        
            default:
                break;
        }
    }

    // Depending on the choosen filter the function will select
    // wich entries will continue the filtering process. 

    _fiterByWordCount() {
        let entitesCopy = [...this.state.entities];
        let filteredArray = [];
        let { pfa, cfa } = this.state;
        if(!pfa && !cfa) {
            filteredArray = entitesCopy;
        } else {
            let secondFilterArray = [];
            entitesCopy.forEach( entrie => {
            let titleLength = entrie.title.split(' ').length;
            if(cfa && titleLength > 5) {
                secondFilterArray.push(entrie);
            } else if(pfa && titleLength <= 5) {
                secondFilterArray.push(entrie);
            }
        });
        filteredArray = this._fiterByPoitsOrComm( cfa, secondFilterArray );
    };
        return filteredArray;
    }

    //Final filter that will sort by hier count the comments or the points
    _fiterByPoitsOrComm( cfa, array ) {
        let filterArray = array.sort((a, b) => {
            return cfa ? b.comments - a.comments : b.points - a.points
          });
        return filterArray;
    }

    render(){
        let { filteredEntities, cfa, pfa } = this.state;
        return filteredEntities &&  (         
          <section className='home-page'>
              <div className='sidebar'></div>
              <div className='main-space'>
                <h1 className='title'>Entities</h1>
                <div className='filtering-table'>
                    <button className='filter-button tansition' onClick={this._fiterActivated} value='all'>Show All</button>
                    <button className='filter-button tansition' onClick={this._fiterActivated} value='filter1'>Filter by points</button>
                    <button className='filter-button tansition' onClick={this._fiterActivated} value='filter2'>Filter by comments</button>
                    <div className='filter-marker'>
                        <div className={`tansition ${ cfa || pfa ? pfa ? 'marker-3' : 'marker-2' : 'marker-1' }`}></div>
                    </div>
                </div>
                <div className='display-table'>
                <Table entities = {this.state.filteredEntities}></Table>  
                </div> 
              </div>
              
          </section>
        );
    }
}
export default HomePage;