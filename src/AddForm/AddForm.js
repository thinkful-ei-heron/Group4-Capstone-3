import React, {Component} from 'react';
import JournalContext from '../contexts/JournalContext';
import BeerApiService from '../services/beer-api-service';
import ReactTooltip from 'react-tooltip';
import Header from '../Header/Header';
import Utils from '../Utils/Utils';
import {Link} from 'react-router-dom';
import './AddForm.css';

export default class AddForm extends Component {

    static contextType = JournalContext;

    state = {
        error: null, color: 1, rating: 0, typeList: ['Ale', 'Altbier', 'American Lager', 'Barley Wine', 'Belgian',
            'Berliner Weisse', 'Bitter', 'Bock', 'Brown Ale', 'Brown Ale', 'Cider', 'Cream Ale', 'Doppelbock', 'Dunkel',
            'Flanders Red Ale', 'German Pilser', 'Gose', 'Helles', 'Helles Bock', 'Honey', 'Imperial IPA', 'IPA',
            'Irish Red Ale', 'Kolsch', 'Lager', 'Lambic', 'Mild Ale', 'Old Ale', 'Pale Ale', 'Pale Lager', 'Pilsner',
            'Porter', 'Quadrupel', 'Rye', 'Saison', 'Schwarzbier', 'Scotch Ale', 'Seasonal Beer', 'Stout', 'Vienna Lager',
            'Wittbier', 'Other']
    };

    firstInput = React.createRef();


    componentDidMount() {
        this.setState({color: this.context.color, rating: this.context.rating})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.color !== this.state.color) {
            this.setState({color: this.context.color})
        }
    }


    handleSubmit = ev => {
        ev.preventDefault();
        //const checkedValues = this.context.checkValues();

        // if(!checkedValues.bool)
        //     this.setState({error: checkedValues.error});
        // else {
        BeerApiService.postBeer({
            name: this.context.name,
            date_created: this.context.date_created,
            location: this.context.location,
            description: this.context.description,
            type: this.context.type,
            rating: this.context.rating,
            abv: this.context.abv,
            heaviness: this.context.heaviness,
            color: this.context.color
        })
            .then(res => {
                this.context.resetAll();
                window.location.replace('/home');
            })
            .catch(res => {
                this.setState({error: res.error});
            });
    };

    render() {
        const {error} = this.state;
        return (
            <div className='add-form-page'>
                <Header location={this.props.location} header={'Add Beer'}/>
                <form onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='error'>Something went wrong!</p>}
                    </div>
                    <section className='form-section'>
                        <fieldset>
                            <legend>Beer Information</legend>
                            <figure>
                                <img src={Utils.getImage(this.context.color)} alt={'Beer'} width={'150px'}/>
                            </figure>
                            <div>
                                <label htmlFor='beer-entry-date'>Date</label>
                                <input className='unstyled' type='date' id='beer-entry-date'
                                       value={this.context.date_created}
                                       onChange={(e) => this.context.setDate(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor='beer-entry-location'>Location</label><span className="required">*</span>
                                <input type='text' id='beer-entry-location' value={this.context.location}
                                       onChange={(e) => this.context.setLoc(e.target.value)} required/>
                            </div>

                            <div>
                                <label htmlFor='beer-entry-name'>Name</label><span className="required">*</span>
                                <input type='text' id='beer-entry-name' value={this.context.name}
                                       onChange={(e) => this.context.setName(e.target.value)} required/>
                            </div>

                            <div>
                                <label htmlFor='beer-entry-type'>Type</label><span className="required">*</span>
                                <select id='beer-entry-type' value={this.context.type}
                                        onChange={(e) => this.context.setType(e.target.value)} required>
                                    {this.state.typeList.map((type, i) => <option key={i} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor='beer-entry-abv' data-tip='Alcohol By Volume'>ABV</label><span
                                className="required">*</span>
                                <ReactTooltip place="top" type="dark" effect="solid"/>
                                <input type='number' id='beer-entry-abv' value={this.context.abv}
                                       onChange={(e) => this.context.setAbv(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor='beer-entry-color' data-tip='Color of beer'>Dark to Light</label><span
                                className="required">*</span>
                                <input type="range" id="beer-entry-color" min="1" max="6" step='1'
                                       value={this.context.color}
                                       onChange={(e) => {
                                           this.context.setColor(parseInt(e.target.value));
                                           this.setState({color: parseInt(e.target.value)})
                                       }}/>
                            </div>
                            <div>
                                <label htmlFor='beer-entry-heaviness' data-tip='Strength of alcohol'>Heavy to
                                    Light</label><span
                                className="required">*</span>
                                <input type="range" min="1" max="5" className="slider" id="heaviness" step='1'
                                       value={this.context.heaviness}
                                       onChange={(e) => this.context.setHeaviness(e.target.value)}/>
                            </div>
                        </fieldset>
                        <fieldset className='lastfield'>
                            <legend>What I think about this beer!</legend>
                            <div>
                                <img className='rating-img' src={Utils.getRatingImage(this.state.rating)}
                                     alt={'Rating icons'} height={'50px'}/>
                                <div>
                                    <label htmlFor='beer-entry-rating'>Rating</label><span className="required">*</span>
                                    <input type="range" min="0" max="9" value={this.context.rating}
                                           onChange={(e) => {
                                               this.context.setRating(e.target.value);
                                               this.setState({rating: parseInt(e.target.value)})
                                           }} className="slider"
                                           id="rating" step="1"/></div>
                            </div>

                            <label className="desc-label" htmlFor='beer-entry-description'>Description</label><span
                            className="required">*</span>
                            <textarea id='beer-entry-description' value={this.context.description}
                                      onChange={(e) => this.context.setDesc(e.target.value)} required/>
                            <button className="clear-submit-back-btn submit-btn" type="submit">
                                Submit
                            </button>
                            <div className="btns-2">
                                <Link to="/home"><button className="clear-submit-back-btn" type="button">Back</button></Link>
                                <button className="clear-submit-back-btn" type="button" onClick={this.context.resetAll}>
                                    Clear
                                </button>

                            </div>

                        </fieldset>
                    </section>
                </form>
            </div>
        );
    }
}
