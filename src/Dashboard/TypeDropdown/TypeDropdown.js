import React, {Component} from 'react';
import UserContext from '../../contexts/UserContext';

class TypeDropdown extends Component {
// Filters by type of beer
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            typeList: [{value: 'none', type: 'Search beer type'}, {value: 'Ale', type: 'Ale'},
                {value: 'Altbier', type: 'Altbier'}, {value: 'American Lager', type: 'American Lager'},
                {value: 'Barley Wine', type: 'Barley Wine'}, {value: 'Belgian', type: 'Belgian'},
                {value: 'Berliner Weisse', type: 'Berliner Weisse'}, {value: 'Bitter', type: 'Bitter'},
                {value: 'Bock', type: 'Bock'}, {value: 'Brown Ale', type: 'Brown Ale'},
                {value: 'Brown Ale', type: 'Brown Ale'}, {value: 'Cider', type: 'Cider'},
                {value: 'Cream Ale', type: 'Cream Ale'}, {value: 'Doppelbock', type: 'Doppelbock'},
                {value: 'Dunkel', type: 'Dunkel'}, {value: 'Flanders Red Ale', type: 'Flanders Red Ale'},
                {value: 'German Pilser', type: 'German Pilser'}, {value: 'Gose', type: 'Gose'},
                {value: 'Helles', type: 'Helles'}, {value: 'Helles Bock', type: 'Helles Bock'},
                {value: 'Honey', type: 'Honey'}, {value: 'Imperial IPA', type: 'Imperial IPA'},
                {value: 'IPA', type: 'IPA'}, {value: 'Irish Red Ale', type: 'Irish Red Ale'},
                {value: 'Kolsch', type: 'Kolsch'}, {value: 'Lager', type: 'Lager'}, {value: 'Lambic', type: 'Lambic'},
                {value: 'Mild Ale', type: 'Mild Ale'}, {value: 'Old Ale', type: 'Old Ale'},
                {value: 'Pale Ale', type: 'Pale Ale'}, {value: 'Pale Lager', type: 'Pale Lager'},
                {value: 'Pilsner', type: 'Pilsner'}, {value: 'Porter', type: 'Porter'},
                {value: 'Quadrupel', type: 'Quadrupel'}, {value: 'Rye', type: 'Rye'}, {value: 'Saison', type: 'Saison'},
                {value: 'Schwarzbier', type: 'Schwarzbier'}, {value: 'Scotch Ale', type: 'Scotch Ale'},
                {value: 'Seasonal Beer', type: 'Seasonal Beer'}, {value: 'Stout', type: 'Stout'},
                {value: 'Vienna Lager', type: 'Vienna Lager'}, {value: 'Wittbier', type: 'Wittbier'},
                {value: 'Other', type: 'Other'}
            ]
        }
    }

    filterType = event => {
        const filter = event.target;
        if(filter.value) {
            if(filter.value === 'none') {
                this.props.sortBeerList(this.context.beerList)
            } else {
                this.props.sortBeerList(this.context.beerList.filter(obj => obj.type===filter.value))
            }
        }
    };

    render() {
        const {typeList} = this.state;

        return (<select className='type-select' onChange={this.filterType}>
            {typeList.map((typeOption, i) => <option key={i} value={typeOption.value}>{typeOption.type}</option>)}
        </select>)
    }
}

export default TypeDropdown;