import React from "react";
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
        this.handleSearch = this.handleSearch.bind(this)
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
    filterType = event => {
        const filter = event.target;
        if(filter.value) {
            this.setState({
                beerList: this.context.beerList.filter(obj => 
                    {return obj.type===filter.value})
            })
        }
    }
    // Name
    handleSearch = event => {
        let currentList = [];
        let newList = [];
        if (event.target.value !== '') {
            currentList = this.context.beerList;
            newList = currentList.filter(beer => {
                const lowerCase = beer.name.toLowerCase();
                const search = event.target.value.toLowerCase();
                return lowerCase.includes(search);
            });
        } else {
            newList = this.context.beerList;
        }
        this.setState({
            beerList: newList
        });
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
        BeerApiService.patchBeer(newJournal, id).then(() =>
            this.state.beerList.splice(this.state.beerList.indexOf(currentBeer), 1, newJournal));
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
                    <div className='beer-date'> {Utils.formattedDate(beerList.date_created)}</div>
                    <img className='rating-img' src={Utils.getRatingImage(beerList.rating)} alt={'Rating icons'} height={'50px'}></img>
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
                            {(this.state.beerList.length !== 0 ) ? 
                            <select className='sort-select'
                                onChange={this.sortSelect}>
                                <option value='none'>Sort By</option>
                                <option value='Youngest'>Youngest</option>
                                <option value='Oldest'>Oldest</option>
                                <option value='Rating ASC'>Rating ASC</option>
                                <option value='Rating DESC'>Rating DESC</option>
                                <option value='Heaviness ASC'>Heaviness ASC</option>
                                <option value='Heaviness DESC'>Heaviness DESC</option>
                            </select> : ''}
                            {(this.context.beerList.length !== 0) ?
                            <select className='type-select' onChange={this.filterType}>
                                <option value='None'>Search beer type</option>
                                <option value='Ale'>Ale</option>
                                <option value='Altbier'>Altbier</option>
                                <option value='American Lager'>American Lager</option>
                                <option value='Barley Wine'>Barley Wine</option>
                                <option value='Belgian'>Belgian</option>
                                <option value='Berliner Weisse'>Berliner Weisse</option>
                                <option value='Bitter'>Bitter</option>
                                <option value='Bock'>Bock</option>
                                <option value='Brown Ale'>Brown Ale</option>
                                <option value='Cider'>Cider</option>
                                <option value='Cream Ale'>Cream Ale</option>
                                <option value='Doppelbock'>Doppelbock</option>
                                <option value='Dunkel'>Dunkel</option>
                                <option value='Flanders Red Ale'>Flanders Red Ale</option>
                                <option value='German Pilser'>German Pilser</option>
                                <option value='Gose'>Gose</option>
                                <option value='Helles'>Helles</option>
                                <option value='Helles Bock'>Helles Bock</option>
                                <option value='Honey'>Honey</option>
                                <option value='Imperial IPA'>Imperial IPA</option>
                                <option value='IPA'>IPA</option>
                                <option value='Irish Red Ale'>Irish Red Ale</option>
                                <option value='Kolsch'>Kolsch</option>
                                <option value='Lager'>Lager</option>
                                <option value='Lambic'>Lambic</option>
                                <option value='Mild ale'>Mild ale</option>
                                <option value='Old Ale'>Old Ale</option>
                                <option value='Pale Ale'>Pale Ale</option>
                                <option value='Pale Lager'>Pale Lager</option>
                                <option value='Pilsner'>Pilsner</option>
                                <option value='Porter'>Porter</option>
                                <option value='Quadrupel'>Quadrupel</option>
                                <option value='Rye'>Rye</option>
                                <option value='Saison'>Saison</option>
                                <option value='Schwarzbier'>Schwarzbier</option>
                                <option value='Scotch Ale'>Scotch Ale</option>
                                <option value='Seasonal Beer'>Seasonal Beer</option>
                                <option value='Stout'>Stout</option>
                                <option value='Vienna lager'>Vienna lager</option>
                                <option value='Wittbier'>Wittbier</option>
                                <option value='Other'>Other</option>
                            </select> : ''}
                            <input className='search-bar' type='text' placeholder='Search by name...' onChange={this.handleSearch}/>
                            <br></br>
                            {(this.state.beerList.length === 0 ) ?  <h2>ADD SOME BEERS YOU FILTHY ANIMAL</h2> : ''}
                            {this.renderBeerList()}
                        </div>
                    </section>
                </main>
            </>
        )
    }
}

export default Dashboard;