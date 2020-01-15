import React from "react";
import NavBar from './../NavBar/NavBar';
import BeerApiService from '../services/beer-api-service';
import UserContext from '../contexts/UserContext';
import DashboardExpanded from '../DashboardExpanded/DashboardExpanded';
import Utils from '../Utils/Utils'
import Header from '../Header/Header'
import './Dashboard.css'

class Dashboard extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            beerList: [],
            search: '',
            filter: '',
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    sortSelect = event => {
        const sortMethod = event.target
        if(sortMethod.value === 'Youngest') {
            this.setState({
              beerList: this.state.beerList.sort((a, b) => new Date(a.date_created) - new Date(b.date_created))  
            })
        } else if(sortMethod.value === 'Oldest') {
            this.setState({
               beerList: this.state.beerList.sort((a, b) => new Date(b.date_created) - new Date(a.date_created)) 
            })
        } else if (sortMethod.value === 'Rating ASC') {
            this.setState({
                beerList: this.state.beerList.sort((a, b) => a.rating - b.rating)
            })
        } else if (sortMethod.value === 'Rating DESC') {
            this.setState({
                beerList: this.state.beerList.sort((a, b) => b.rating - a.rating)
            })
        } else if (sortMethod.value === 'Heaviness ASC') {
            this.setState({
                beerList: this.state.beerList.sort((a, b) => a.heaviness - b.heaviness)
            })
        } else if (sortMethod.value === 'Heaviness DESC') {
            this.setState({
                beerList: this.state.beerList.sort((a, b) => b.heaviness - a.heaviness)
            })
        }
    }

    // Filters by type of beer
    filterType() {

    }

    // Name
    search() {
    }


    handleDelete(id) {
        BeerApiService.deleteBeer(id)
        this.setState({beerList: this.state.beerList.filter(beer => beer.id !== id)})
    }

    componentDidMount() {
        this.context.clearError()
        BeerApiService.getAllBeers()
            .then(this.context.setBeerList)
            .then(() => this.setState({beerList: this.context.beerList})
            )
            .catch(this.context.setError)
    }

    handleSubmitEdit = (id, newJournal) => {
        let currentBeer = this.state.beerList.find((beer) => beer.id === id);
        BeerApiService.patchBeer(newJournal, id).then(() =>  this.state.beerList.splice(this.state.beerList.indexOf(currentBeer), 1, newJournal))
        this.forceUpdate();
    };

    renderBeerList() {
        return this.state.beerList.map((beerList, i) => (beerList.expanded) ?
            <DashboardExpanded key={i} toggleExpanded={this.context.toggleExpanded} journal={beerList}
                               handleDelete={this.handleDelete} handleSubmit={this.handleSubmitEdit}/> :
            <div className= 'beerList-item' key={i}>
                <button
                    onClick={() => this.context.toggleExpanded(beerList.id)}
                    className='journal-item-button'>
                    <img className='beer-color-img'src={Utils.getImage(beerList.color)} alt='beer-color'></img>
                    <h4>{beerList.name}</h4>
                    <div>{Utils.formattedDate(beerList.date_created)}</div>
                    <div>Rating: {beerList.rating}</div>
                </button>
            </div>)
    }

    render() {
        return (
            <>
                <main className='dashboard-page'>
                    <Header location={this.props.location} header={'Home'}/>
                    <section className='dashboard-bottom'>
                        <div className={'darker'}>
                            <select 
                                onChange={this.sortSelect}>
                                <option value='none'>Sort By</option>
                                <option value='Youngest'>Youngest</option>
                                <option value='Oldest'>Oldest</option>
                                <option value='Rating ASC'>Rating ASC</option>
                                <option value='Rating DESC'>Rating DESC</option>
                                <option value='Heaviness ASC'>Heaviness ASC</option>
                                <option value='Heaviness DESC'>Heaviness DESC</option>
                            </select>
                            {this.renderBeerList()}
                        </div>
                    </section>
                </main>
            </>
        )
    }
}

export default Dashboard;