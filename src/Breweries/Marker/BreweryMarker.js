import React, {Component} from 'react';
import KegMarker from '../../assets/markers/keg-marker.png';

export default class BreweryMarker extends Component {
    render() {
        const K_WIDTH = 38;
        const K_HEIGHT = 40;
        const greatPlaceStyle = {
            // initially any map object has left top corner at lat lng coordinates
            // it's on you to set object origin to 0,0 coordinates
            position: 'absolute',
            width: K_WIDTH,
            left: -K_WIDTH / 2,
            top: -K_HEIGHT / 2,
            textAlign: 'center',
            color: '#3f51b5',
            fontSize: 16,
            fontWeight: 'bold',
            padding: 4
        };
        return (
            <img onClick={()=> this.props.updateSelected(this.props.id)} src={KegMarker} style={greatPlaceStyle} alt={'Brewery Marker'}/>
        );
    }
}