import React, {Component} from 'react';
import CircleIndicator from './Circle-Indicator/CircleIndicator'
export default class ListComponent extends Component {
    render() {
        return (
            <div><h4><CircleIndicator isOpen={(this.props.place.opening_hours) ? (this.props.place.opening_hours.open_now) : null}/>{this.props.place.name}</h4>
            <p>{this.props.place.vicinity}</p>
                <p>{this.props.place.rating}</p>
            </div>
        );
    }
}