import React, {Component} from "react";
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
                    'Click the next button to follow the tutorial.' +
                    'or click close to go ahead and get started yourself!'
            },
                {
                    className: 'tut-2',
                    desc: 'Date - select when you had the beer. If you drank the beer today, feel free to leave it blank.'
                },
                {className: 'tut-3', desc: 'Location - add where you had the beer, or where the beer is brewed.'},
                {className: 'tut-4', desc: 'Name - what was the name of the beer you drank?'},
                {className: 'tut-5', desc: 'Type - select the type of beer you had, if not shown, select Other.'},
                {className: 'tut-6', desc: 'ABV - the alcohol by volume of the beer.'},
                {className: 'tut-7', desc: 'Color - use the slider to log the color of the beer from dark to light.'},
                {className: 'tut-8', desc: 'Heaviness - use the slider to log how strong the flavor of alcohol is in the beer.'},
                {className: 'tut-9', desc: 'Rating - how would you rate the beer?'},
                {className: 'tut-10', desc: 'Description - here you can log any additional thoughts you have about the beer. Such as what flavors are present, or anything else memorable about the beer'},
                {className: 'tut-11', desc: 'This button will take you back to the home page.'},
                {className: 'tut-12', desc: 'This button will clear the form of everything, so you can start over'},
                {className: 'tut-13', desc: 'Click here to submit your new beer. Cheers!'},
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