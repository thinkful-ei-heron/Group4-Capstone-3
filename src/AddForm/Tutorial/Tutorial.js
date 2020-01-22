import React, {Component, useRef} from "react";
import './Tutorial.css'
import {Link} from "react-router-dom";

class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            pages: [{
                className: 'tut-1',
                desc: 'Welcome to the DeerBeer Add Beer Page! This is where most of the action takes place. ' +
                    'Creating and implementing your own beer is easy and simple to do! Click through the next, to follow the tutorial ' +
                    'or close to go ahead and get started!'
            },
                {
                    className: 'tut-2',
                    desc: 'This is the Date, here is where you should select the date that you had the beer on.'
                },
                {className: 'tut-3', desc: 'This is the Location that the beer was had at.'},
                {className: 'tut-4', desc: 'This is the Name, what was the name of what you drank?'},
                {className: 'tut-5', desc: 'The Specific Type of beer you had, if not shown, select Other.'},
                {className: 'tut-6', desc: 'The Alcohol By Volume of the beer.'},
                {className: 'tut-7', desc: 'The Color Dark to Light of the beer.'},
                {className: 'tut-8', desc: 'This is the Heaviness of the beer, or how strong the alcohol from the beer.'},
                {className: 'tut-9', desc: 'What your personal Rating of the beer.'},
                {className: 'tut-10', desc: 'This is the Description of what you think of the beer.'},
                {className: 'tut-11', desc: 'This Button will take you to the home page.'},
                {className: 'tut-12', desc: 'THIS BUTTON WILL CLEAR YOUR BEER!'},
                {className: 'tut-13', desc: 'This button Submits the beer to your dashboard, and account.'},
            ]
        };
        this.myRef = React.createRef()
    }

    decrementPage = () => {
        if (this.state.index !== 0) {
            this.setState({index: this.state.index - 1})
        } else {
            this.setState({index: this.state.pages.length - 1})
        }
        setTimeout(() => this.scrollToRef(), 100)
    };
    incrementPage = () => {
        if (this.state.index === this.state.pages.length - 1) {
            window.location.replace('/add');
        } else {
            this.setState({index: this.state.index + 1});
            setTimeout(() => this.scrollToRef(), 100)

        }
    };
    scrollToRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

    componentDidMount() {
        this.scrollToRef();
    }

    render() {
        return (<>
                <div className={'tutorial-addform'}>
                    <div className={'buttons'}>
                        <Link to={'/add'}>Close</Link>
                        <button onClick={() => this.decrementPage()}>Prev</button>
                        {<span>{this.state.index}/{this.state.pages.length - 1}</span>}
                        {(this.state.index === this.state.pages.length - 1)  ? <Link to={'/add'}>Next</Link>: <button onClick={() => this.incrementPage()}>Next</button>}
                    </div>
                </div>
                <div ref={this.myRef} className={'tut ' + this.state.pages[this.state.index].className}>
                    <div className={'left'}/>
                    <p>{this.state.pages[this.state.index].desc}</p>
                    <div className={'right'}/>
                </div>
            </>
        )
    }
}

export default Tutorial;