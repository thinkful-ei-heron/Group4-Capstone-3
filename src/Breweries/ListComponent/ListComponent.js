import React, {Component} from 'react';
import CircleIndicator from './Circle-Indicator/CircleIndicator';
import rating from '../../assets/rating/star-rating.png'
import './ListComponent.css'

export default class KeyComponent extends Component {
    render() {
        return (
            <>
                <h4><CircleIndicator
                    isOpen={(this.props.place.opening_hours) ? (this.props.place.opening_hours.open_now) : null}/>{this.props.place.name}
                </h4>
                <p>{this.props.place.vicinity}
                </p>
                <button onClick={() => window.open('https://google.com/maps?q=' + this.props.place.vicinity)}>Go</button>
                <div className={'list-component-rating'}>
                    <img src={rating} alt={'Star Rating'}/>
                    <div
                        style={{width: `${Math.round(this.props.place.rating / 5 * 100)}%`}}/>
                </div>
            </>
        );
    }
}