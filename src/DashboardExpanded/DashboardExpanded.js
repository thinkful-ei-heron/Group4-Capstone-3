import React from "react";
import UserContext from '../contexts/UserContext';

class DashboardExpanded extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            journal: this.props.journal,
            isEditing: false,
            newJournal: {
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.forceUpdate()
        }
    }

    getImage(id) {
        console.log(id);
        let beerImg = ''
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
        return (
            <li>
                <figure>
                    <img src={this.getImage(this.state.journal.color)} alt={'Beer'} width={'150px'}/>
                    <figcaption>ABV: {this.state.journal.abv}</figcaption>
                </figure>
                <section>
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
                </section>
            </li>
        )
    }
}

export default DashboardExpanded;