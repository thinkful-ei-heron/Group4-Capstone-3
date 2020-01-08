import React from "react";
import NavBar from './../NavBar/NavBar';
import BeerApiService from '../services/beer-api-service';
import UserContext from '../contexts/UserContext';

class Dashboard extends React.Component {

  static contextType = UserContext

  componentDidMount() {
    this.context.clearError()
    BeerApiService.getAllBeers()
    ////.then to set beer list from a new function in context
      // .then(this.context.setBeerList)
      // .catch(this.context.setError)
    ////List of favorite beers on homepage?
  }
    render() {
        return (
          <>
            <h2>Dashboard</h2>
            <NavBar />
            {/* <BeerList /> */}
          </>
        )
    }
}

export default Dashboard;