import React from "react";
import NavBar from './../NavBar/NavBar';
import BeerApiService from '../services/beer-api-service';
import UserContext from '../contexts/UserContext';
import './Dashboard.css'

class Dashboard extends React.Component {

  static contextType = UserContext

  componentDidMount() {
    this.context.clearError()
    BeerApiService.getAllBeers()
      .then(this.context.setBeerList)
      .catch(this.context.setError)
  }

  handleExpand() {

  }

  renderBeerList() {
    const { beerList = [] } = this.context
      return beerList.map(beerList => 
      <div>
        <button 
          onClick={this.handleExpand()}
          className='journal-item-button'>
          <h4>
              {beerList.name}
          </h4>
          <div>
            {beerList.date_created}
          </div>
          <div>
            Rating: {beerList.rating}
          </div>
        </button>
      </div>)
  }
    render() {
        return (
          <>
            <h2>Dashboard</h2>
            <NavBar />
            {this.renderBeerList()}
          </>
        )
    }
}

export default Dashboard;