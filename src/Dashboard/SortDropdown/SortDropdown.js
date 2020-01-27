import React, {Component} from 'react';
class SortDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortList: [{value: 'none', type: 'Sort By'},{value: 'Youngest', type: 'Youngest'},{value: 'Oldest', type: 'Oldest'},
                {value: 'Rating ASC', type: 'Rating ASC'},{value: 'Rating DESC', type: 'Rating DESC'},
                {value: 'Heaviness ASC', type: 'Heaviness ASC'}, {value: 'Heaviness DESC', type: 'Heaviness DESC'}]
        }
    }

    sortSelect = (event) => {
        const sortMethod = event.target;
        if(sortMethod.value === 'Youngest') {
            this.props.sortBeerList(this.props.beerList.sort((a, b) => new Date(a.date_created) - new Date(b.date_created)))
        } else if(sortMethod.value === 'Oldest') {
            this.props.sortBeerList(this.props.beerList.sort((a, b) => new Date(b.date_created) - new Date(a.date_created)))
        } else if (sortMethod.value === 'Rating ASC') {
            this.props.sortBeerList(this.props.beerList.sort((a, b) => a.rating - b.rating));
        } else if (sortMethod.value === 'Rating DESC') {
            this.props.sortBeerList(this.props.beerList.sort((a, b) => b.rating - a.rating));
        } else if (sortMethod.value === 'Heaviness ASC') {
            this.props.sortBeerList(this.props.beerList.sort((a, b) => a.heaviness - b.heaviness));
        } else if (sortMethod.value === 'Heaviness DESC') {
            this.props.sortBeerList(this.props.beerList.sort((a, b) => b.heaviness - a.heaviness));
        }
    };
    
    render() {
        const {sortList} = this.state;
        
        return (<select className='sort-select'
                        onChange={this.sortSelect}>
            {sortList.map((sortOption, i)=> <option key={i} value={sortOption.value}>{sortOption.type}</option>)}
        </select>)
    }
}

export default SortDropdown;