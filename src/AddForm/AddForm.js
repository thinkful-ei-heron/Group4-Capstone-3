import React, {Component} from 'react';
import JournalContext from "../contexts/JournalContext";
import BeerApiService from "../services/beer-api-service";
import Header from "../Header/Header"
import Utils from '../Utils/Utils'
import './AddForm.css' 

export default class AddForm extends Component {

    static contextType = JournalContext;

    state = {error: null, color: 1};

    firstInput = React.createRef();


    componentDidMount() {
        this.setState({color: this.context.color})
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
                    <section >
                        <figure>
                            <img src={Utils.getImage(this.context.color)} alt={'Beer'} width={'150px'}/>
                        </figure>

                        <div>
                            <label htmlFor='beer-entry-date'>Date</label>
                            <input type='date' id='beer-entry-date' value={this.context.date_created}
                                   onChange={(e) => this.context.setDate(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-name'>Name</label>
                            <input type='text' id='beer-entry-name' value={this.context.name}
                                   onChange={(e) => this.context.setName(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-location'>Location</label>
                            <input type='text' id='beer-entry-location' value={this.context.location}
                                   onChange={(e) => this.context.setLoc(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-rating'>Rating</label>
                            <input type="range" min="0" max="9" value={this.context.rating}
                                   onChange={(e) => this.context.setRating(e.target.value)} className="slider"
                                   id="rating" step="1"/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-abv'>ABV</label>
                            <input type='number' id='beer-entry-abv' value={this.context.abv}
                                   onChange={(e) => this.context.setAbv(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-type'>Type</label>
                            <input type='text' id='beer-entry-type' value={this.context.type}
                                   onChange={(e) => this.context.setType(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-rating'>Description</label>
                            <textarea id='beer-entry-description' value={this.context.description}
                                      onChange={(e) => this.context.setDesc(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-color'>Dark to Light</label>
                            <input type="range" id="beer-entry-color" min="1" max="6" step='1'
                                   value={this.context.color}
                                   onChange={(e) => {
                                       this.context.setColor(parseInt(e.target.value));
                                       this.setState({color: parseInt(e.target.value)})
                                   }}/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-heaviness'>Heavy to Light</label>
                            <input type="range" min="1" max="5" className="slider" id="heaviness" step='1'
                                   value={this.context.heaviness}
                                   onChange={(e) => this.context.setHeaviness(e.target.value)}/>
                        </div>
                        <div>
                            <button type='button' onClick={this.context.resetAll}>Clear</button>
                            <button type='submit'>Submit</button>
                        </div>
                    </section>
                </form>
            </div>
        
        )
    }
}