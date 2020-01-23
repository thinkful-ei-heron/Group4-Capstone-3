import React, {Component} from 'react';
import './CircleIndicator.css'

export default class CircleIndicator extends Component {


    getClassName = () => {
    if(this.props.isOpen === null) {
        return 'circle-indicator'
    } else if (this.props.isOpen) {
        return 'circle-indicator-green'
    } else {
        return 'circle-indicator-red'
    }

    };

    render() {
        return (
            <div title={'Green = Open, Red = Closed, Gray = No Data'}
                className={this.getClassName()}/>
        );
    }
}