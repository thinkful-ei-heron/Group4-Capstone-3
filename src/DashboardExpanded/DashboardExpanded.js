import React from "react";
import UserContext from '../contexts/UserContext';

class DashboardExpanded extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            journal: this.props.journal,
            isEditable: false,
            name: '',
            date_created: '',
            location: '',
            description: '',
            type: '',
            rating: 0,
            abv: 0,
            heaviness: 0,
            color: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                name: this.props.journal.name,
                date_created: this.props.journal.date_created,
                location: this.props.journal.location,
                description: this.props.journal.description,
                type: this.props.journal.type,
                rating: this.props.journal.rating,
                abv: this.props.journal.abv,
                heaviness: this.props.journal.heaviness,
                color: this.props.journal.color
            })
            this.forceUpdate()
        }
    }

    handleName = (e) => {
        this.setState({name: e.target.value})
    };
    handleDate = (e) => {
        this.setState({date_created: e.target.value})
    };
    handleLoc = (e) => {
        this.setState({location: e.target.value})
    };
    handleDesc = (e) => {
        this.setState({description: e.target.value})
    };
    handleType = (e) => {
        this.setState({type: e.target.value})
    };
    handleRating = (e) => {
        this.setState({rating: e.target.value})
    };
    handleAbv = (e) => {
        this.setState({abv: e.target.value})
    };
    handleHeaviness = (e) => {
        this.setState({heaviness: e.target.value})
    };
    handleColor = (e) => {
        this.setState({color: e.target.value})
    };

    toggleIsEditable = () => {
        this.setState({
            isEditable: !this.state.isEditable,
            name: this.props.journal.name,
            date_created: this.props.journal.date_created,
            location: this.props.journal.location,
            description: this.props.journal.description,
            type: this.props.journal.type,
            rating: this.props.journal.rating,
            abv: this.props.journal.abv,
            heaviness: this.props.journal.heaviness,
            color: this.props.journal.color
        })

    };

    getImage(id) {
        let beerImg = '';
        switch (id) {
            case 6:
                beerImg = require('../assets/beers/light.jpg');
                break;
            case 5:
                beerImg = require('../assets/beers/light-2.jpg');
                break;
            case 4:
                beerImg = require('../assets/beers/light-3.jpg');
                break;
            case 3:
                beerImg = require('../assets/beers/medium.jpg');
                break;
            case 2:
                beerImg = require('../assets/beers/dark.jpg');
                break;
            case 1:
                beerImg = require('../assets/beers/dark-1.jpg');
                break;
            default:
                beerImg = require('../assets/beers/light.jpg');
                break;
        }
        return beerImg;
    }

    render() {
        let date = new Date(this.state.journal.date_created);
        let formattedDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;

        let x = (this.state.isEditable) ? (
            <form onSubmit={() => this.props.handleSubmit(this.props.journal.id, {
                id: this.props.journal.id,
                name: this.state.name,
                date_created: this.state.date_created,
                location: this.state.location,
                description: this.state.description,
                type: this.state.type,
                rating: this.state.rating,
                abv: parseFloat(this.state.abv),
                heaviness: parseInt(this.state.heaviness),
                color: parseInt(this.state.color)
            })}>
                <figure>
                    <img src={this.getImage(parseInt(this.state.color))} alt={'Beer'} width={'150px'}/>
                    <figcaption>ABV: <input type='number' value={this.state.abv} onChange={this.handleAbv}/>
                    </figcaption>
                </figure>
                <section>
                    <label>Date <input type='date' value={this.state.date_created} onChange={this.handleDate}/></label>
                    <label>Name <input type='text' value={this.state.name} onChange={this.handleName}/></label>
                    <label>Loc <input type='text' value={this.state.location} onChange={this.handleLoc}/></label>
                </section>
                <input type='range' min="0" max="9" value={this.state.rating} onChange={this.handleRating}/>
                <textarea value={this.state.description} onChange={this.handleDesc}/>
                <h3>Dark to Light</h3>
                <input type='range' min="1" max="6" value={this.state.color} onChange={this.handleColor}/>
                <h3>Heavy to Light</h3>
                <input type='range' min="1" max="5" value={this.state.heaviness} onChange={this.handleHeaviness}/>
                <button onClick={this.toggleIsEditable}>Cancel</button>
                <button type={"submit"}>Submit</button>
            </form>) : (
            <section>
                <figure>
                    <img src={this.getImage(this.state.journal.color)} alt={'Beer'} width={'150px'}/>
                    <figcaption>ABV: {this.state.journal.abv} </figcaption>
                </figure>
                <section onClick={() => this.props.toggleExpanded(this.state.journal.id)}>
                    <h3>Date <span>{formattedDate}</span></h3>
                    <h3>Name <span>{this.state.journal.name}</span></h3>
                    <h3>Loc <span>{this.state.journal.location}</span></h3>
                </section>
                <input type='range' min="0" max="9" value={this.state.journal.rating} readOnly/>
                <p>{this.state.journal.description}</p>
                <h3>Dark to Light</h3>
                <input type='range' min="1" max="6" value={this.state.journal.color} readOnly/>
                <h3>Heavy to Light</h3>
                <input type='range' min="1" max="5" value={this.state.journal.heaviness} readOnly/>
                <button onClick={()=> this.props.handleDelete(this.state.journal.id)}>Delete</button>
                <button onClick={this.toggleIsEditable}>Edit</button>
            </section>);
        return (
            <li>

                {x}
            </li>
        )
    }
}

export default DashboardExpanded;