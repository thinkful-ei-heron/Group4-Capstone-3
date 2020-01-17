import React, {Component} from 'react';
import JournalContext from '../../contexts/JournalContext'
import './Marker.css'
import {Link} from "react-router-dom";

export default class InfoMarker extends Component {
    static contextType = JournalContext;

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props) {
            this.forceUpdate()
        }
    }

    render() {
        const K_WIDTH = 100;
        const K_HEIGHT = 50;
        const greatPlaceStyle = {
            width: K_WIDTH,
            left: -K_WIDTH / 2,
            top: -K_HEIGHT * 2.25,
        };
        return (
            <div className={'info-marker'} style={greatPlaceStyle}>
                <button onClick={this.props.resetSelected}>X</button>
                <p>{this.props.name}</p>
                {/*// <img src={StarMarker} style={greatPlaceStyle} alt={'Marker'}/>*/}
                <Link to={'/add'}>
                 <button onClick={() => this.context.setLoc(this.props.vicinity)}>Add Beer
                </button>
                </Link>
            </div>
        );
    }
}