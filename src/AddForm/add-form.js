import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import JournalContext from "../contexts/UserContext";
import BeerApiService from "../services/beer-api-service";
import NavBar from "../NavBar/NavBar"

export default class AddForm extends Component {

    static contextType = JournalContext;

    state = {error: null};

    firstInput = React.createRef();

    handleSubmit = ev => {
        ev.preventDefault();
        const {username, password} = ev.target;

        this.setState({error: null});

        BeerApiService.postBeer({
            user_name: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = "";
                password.value = "";
                this.context.processLogin(res.authToken);
                this.handleLoginSuccess();
            })
            .catch(res => {
                this.setState({error: res.error});
            });
    };

    render() {
        const {error} = this.state;
        return (
            <div>
                <h1>The Dear Beer</h1>
                <NavBar/>
                <h3>Add Beer Entry</h3>
                <form onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='error'>Something went wrong!</p>}
                    </div>
                    <section>
                        <div>
                            <label htmlFor='beer-entry-date'>Date</label>
                            <input type='text' id='beer-entry-date' name='date' required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-name'>Name</label>
                            <input type='text' id='beer-entry-name' name='name' required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-location'>Loc</label>
                            <input type='text' id='beer-entry-location' name='location' required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-rating'>Rating</label>
                            <div className="slidecontainer">
                                <input type="range" min="1" max="5" value="1" className="slider" id="rating"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-apv'>APV</label>
                            <input type='number' id='beer-entry-apv' name='apv' required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-rating'>Description</label>
                            <textarea id='beer-entry-description' name='Description' required/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-rating'>Dark to Light</label>
                            <input type="range" min="1" max="5" value="1" className="slider" id="color"/>
                        </div>
                        <div>
                            <label htmlFor='beer-entry-heaviness'>Heavy to Light</label>
                            <input type="range" min="1" max="5" value="1" className="slider" id="heaviness"/>
                        </div>
                        <div>
                            <button>
                                Clear
                            </button>
                            <button
                                type='submit'>
                                Submit
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        )
    }
}