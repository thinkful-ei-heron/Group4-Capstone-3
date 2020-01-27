import React from "react";
import BeerApiService from '../services/beer-api-service';
import UserContext from '../contexts/UserContext';
import DashboardExpanded from '../DashboardExpanded/DashboardExpanded';
import Utils from '../Utils/Utils'
import Header from '../Header/Header'
import DetailsIcon from '../assets/radio/details-icon.png'
import LargeIcon from '../assets/radio/large-icon.png'
import ListIcon from '../assets/radio/list-icon.png'
import SmallIcon from '../assets/radio/small-icon.png'
import './Dashboard.css'
import SortDropdown from './SortDropdown/SortDropdown';
import TypeDropdown from './TypeDropdown/TypeDropdown';
import EmptyList from './EmptyList/EmptyList';
class Dashboard extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            beerList: [],
            search: '',
            filter: '',
            selectedOption: 'large-icons'
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    sortBeerList = (beerList) => {
        this.setState({beerList})
    };
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
    };
    handleDelete(id) {
        BeerApiService.deleteBeer(id);
        this.setState({beerList: this.state.beerList.filter(beer => beer.id !== id)})
    }
    componentDidMount() {
        this.context.clearError();
        BeerApiService.getAllBeers()
            .then(this.context.setBeerList)
            .then(() => this.setState({beerList: this.context.beerList}))
    }
    handleSubmitEdit = (id, newJournal) => {
        let currentBeer = this.state.beerList.find((beer) => beer.id === id);
        BeerApiService.patchBeer(newJournal, id).then(() =>
            this.state.beerList.splice(this.state.beerList.indexOf(currentBeer), 1, newJournal));
        this.forceUpdate();
    };
    renderBeerList() {
        if (this.state.selectedOption === 'small-icons') {
            return this.state.beerList.map((beerList, i) => (beerList.expanded) ?
            <DashboardExpanded key={i} toggleExpanded={this.context.toggleExpanded} journal={beerList}
                               handleDelete={this.handleDelete} handleSubmit={this.handleSubmitEdit}/> :
            <div className= 'beerList-item' key={i}>
                <button
                    onClick={() => this.context.toggleExpanded(beerList.id)}
                    className='journal-item-button-small'>
                    <h4>{beerList.name}</h4>
                    <img className='rating-img' src={Utils.getRatingImage(beerList.rating)} alt={'Rating icons'} height={'50px'}/>
                    <div className='beer-date'> {Utils.formattedDate(beerList.date_created)}</div>
                </button>
            </div>)
        } else if (this.state.selectedOption === 'large-icons') {
            return this.state.beerList.map((beerList, i) => (beerList.expanded) ?
            <DashboardExpanded key={i} toggleExpanded={this.context.toggleExpanded} journal={beerList}
                               handleDelete={this.handleDelete} handleSubmit={this.handleSubmitEdit}/> :
            <div className= 'beerList-item' key={i}>
                <button
                    onClick={() => this.context.toggleExpanded(beerList.id)}
                    className='journal-item-button-large'>
                    <img className='beer-color-img'src={Utils.getImage(beerList.color)} alt='beer-color'/>
                    <h4>{beerList.name}</h4>
                    <div className='beer-date'> {Utils.formattedDate(beerList.date_created)}</div>
                    <img className='rating-img' src={Utils.getRatingImage(beerList.rating)} alt={'Rating icons'} height={'50px'}/>
                </button>
            </div>)
        } else if (this.state.selectedOption === 'list') {
            return this.state.beerList.map((beerList, i) => (beerList.expanded) ?
            <DashboardExpanded key={i} toggleExpanded={this.context.toggleExpanded} journal={beerList}
                               handleDelete={this.handleDelete} handleSubmit={this.handleSubmitEdit}/> :
            <div className= 'beerList-item' key={i}>
                <button
                    onClick={() => this.context.toggleExpanded(beerList.id)}
                    className='journal-item-button-list'>
                    <h4>{beerList.name}</h4>
                    {/* <img className='rating-img' src={Utils.getRatingImage(beerList.rating)} alt={'Rating icons'} height={'50px'}></img> */}
                    <div className='beer-date'> {Utils.formattedDate(beerList.date_created)}</div>
                </button>
            </div>)
        } else if (this.state.selectedOption === 'details') {
            return this.state.beerList.map((beerList, i) => (beerList.expanded) ?
            <DashboardExpanded key={i} toggleExpanded={this.context.toggleExpanded} journal={beerList}
                               handleDelete={this.handleDelete} handleSubmit={this.handleSubmitEdit}/> :
            <div className= 'beerList-item' key={i}>
                <button
                    onClick={() => this.context.toggleExpanded(beerList.id)}
                    className='journal-item-button-details'>
                            <img className='beer-color-img'src={Utils.getImage(beerList.color)} alt='beer-color'/>
                        <div className='details-column'>
                            <h4>{beerList.name}</h4>
                            <div className='beer-date'> {Utils.formattedDate(beerList.date_created)}</div>
                            <img className='rating-img' src={Utils.getRatingImage(beerList.rating)} alt={'Rating icons'} height={'50px'}/>
                            <h5>{beerList.location}</h5>    
                        </div>
                    
                </button>
            </div>)
        }
    }
    handleOptionChange = event => {
        this.setState({
            selectedOption: event.target.value
        })
        document.getElementById('small-icons-img').className = 'inactiveClass'
        document.getElementById('large-icons-img').className = 'inactiveClass'
        document.getElementById('list-img').className = 'inactiveClass'
        document.getElementById('details-img').className = 'inactiveClass'
        document.getElementById(`${event.target.value}-img`).className = 'activeClass'
    }
    render() {
        return (
            <>
                <main className='dashboard-page'>
                    <Header location={this.props.location} header={'Home'}/>
                    <section className='dashboard-bottom'>
                        <div className={'darker'}>
                        <span className="radio-group">

                            <input type="radio" value="small-icons" id="small-icons" className="hidden" checked={this.state.selectedOption === 'small-icons'} onChange={this.handleOptionChange}/>
                            <label htmlFor="small-icons"><img src={SmallIcon} alt='small icon view' height='20px' width='20px' id='small-icons-img' className='inactiveClass'/></label>

                            <input type="radio" value="large-icons" id="large-icons" className="hidden" checked={this.state.selectedOption === 'large-icons'} onChange={this.handleOptionChange}/>
                            <label htmlFor="large-icons"><img src={LargeIcon} alt='large icon view' height='20px' width='20px' id='large-icons-img' className='activeClass'/></label>

                            <input type="radio" value="list" id="list" className="hidden" checked={this.state.selectedOption === 'list'} onChange={this.handleOptionChange}/>
                            <label htmlFor="list"><img src={ListIcon} alt='list view' height='20px' width='20px' id='list-img' className='inactiveClass'/></label>

                            <input type="radio" value="details" id="details" className="hidden" checked={this.state.selectedOption === 'details'} onChange={this.handleOptionChange}/>
                            <label htmlFor="details"><img src={DetailsIcon} alt='detailed view' height='20px' width='20px' id='details-img' className='inactiveClass'/></label>

                        </span>
                            {(this.context.beerList.length !== 0) ?
                                <SortDropdown beerList={this.state.beerList} sortBeerList={this.sortBeerList}/> : ''}
                            {(this.context.beerList.length !== 0) ?
                                <TypeDropdown beerList={this.state.beerList} sortBeerList={this.sortBeerList}/> : ''}
                            {(this.context.beerList.length !== 0) ?
                                <input className='search-bar' type='text' placeholder='Search by name...' onChange={this.handleSearch}/> : ''}
                            <br/>
                            {(this.context.beerList.length === 0 ) ?  <EmptyList />: ''}
                            {this.renderBeerList()}
                        </div>
                    </section>
                </main>
            </>
        )
    }
}

export default Dashboard;
