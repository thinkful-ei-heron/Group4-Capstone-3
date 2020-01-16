import React, {Component} from 'react';
import './CircleIndicator.css'
export default class CircleIndicator extends Component {
    render() {
        return (
            <div className={(!!this.props.isOpen) ? (this.props.isOpen) ? 'circle-indicator-green' : 'circle-indicator-red' : 'circle-indicator'}/>
        );
    }
}