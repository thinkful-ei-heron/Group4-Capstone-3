import React from "react";
import NavBar from './../NavBar/NavBar';
import BeerApiService from '../services/beer-api-service';
import UserContext from '../contexts/UserContext';
import DashboardExpanded from '../DashboardExpanded/DashboardExpanded';
import './Dashboard.css'

class Dashboard extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            beerList: [],
            search: '',
            filter: '',
            sort: 'None'
        }
    }

    toggleSort() {// Rating  ASC DSC Heavyness ASC DESC
        switch (this.state.sort) {
            case 'None':
                this.setState({sort: 'Youngest', beerList: this.state.beerList.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())});
                break;
            case 'Youngest':
                this.setState({sort: 'Oldest', beerList: this.state.beerList.sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime())});
                break;
            case 'Oldest':
                this.setState({sort: 'Rating ASC', beerList: this.state.beerList.sort((a,b)=> a.rating - b.rating)});
                break;
            case 'Rating ASC':
                this.setState({sort: 'Rating DSC', beerList: this.state.beerList.sort((a,b)=> b.rating - a.rating)});
                break;
            case 'Rating DSC':
                this.setState({sort: 'Heaviness ASC', beerList: this.state.beerList.sort((a,b)=> a.heaviness - b.heaviness)});
                break;
            case "Heaviness ASC":
                this.setState({sort: 'Heaviness DSC', beerList: this.state.beerList.sort((a,b)=> b.heaviness - a.heaviness)});
                break;
            case "Heaviness DSC":
                this.setState({sort: 'None', beerList: this.context.beerList});
                break;
            default:
                this.setState({sort: 'None'});
                break;
        }
    }

    // Filters by type of beer
    filterType() {

    }

    // Name
    search() {
    }


    componentDidMount() {
        this.context.clearError()
        BeerApiService.getAllBeers()
            .then(this.context.setBeerList)
            .then(() => this.setState({beerList: this.context.beerList})
            )
            .catch(this.context.setError)
    }

    renderBeerList() {
        return this.state.beerList.map((beerList, i) => (beerList.expanded) ?
            <DashboardExpanded key={i} toggleExpanded={this.context.toggleExpanded} journal={beerList}/> :
            <div key={i}>
                <button
                    onClick={() => this.context.toggleExpanded(beerList.id)}
                    className='journal-item-button'>
                    <h4>{beerList.name}</h4>
                    <div>{beerList.date_created}</div>
                    <div>Rating: {beerList.rating}</div>
                </button>
            </div>)
    }

    render() {
        return (
            <>
                <main className='dashboard-page'>
                <h2>Dashboard</h2>
                <NavBar/>
                <button onClick={()=>
                    this.toggleSort(this.state.beerList)}>{this.state.sort}</button>
                {this.renderBeerList()}
                </main>
            </>
        )
    }
}

export default Dashboard;