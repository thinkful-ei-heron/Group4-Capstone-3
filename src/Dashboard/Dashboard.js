import React from "react";
import NavBar from './../NavBar/NavBar';
import BeerApiService from '../services/beer-api-service';
import UserContext from '../contexts/UserContext';

class Dashboard extends React.Component {

  static contextType = UserContext

  componentDidMount() {
    this.context.clearError()
    BeerApiService.getAllBeers()
      .then(this.context.setBeerList)
      .catch(this.context.setError)
  }
  renderBeerList() {
    const { beerList = [] } = this.context
      return beerList.map
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