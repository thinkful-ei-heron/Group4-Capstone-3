import React, {Component} from 'react';
import KegIcon from '../../assets/markers/keg-marker.png'
import MarkerIcon from '../../assets/markers/beer-marker.png'

export default class Marker extends Component {
    render() {
        const K_WIDTH = (this.props.isBeer) ? 20 : 50;
        const K_HEIGHT = (this.props.isBeer) ? 50 : 20;
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
            (this.props.isBeer) ? <img src={MarkerIcon} style={greatPlaceStyle} alt={'Marker'}/> :
                <div style={greatPlaceStyle}><img src={KegIcon} style={greatPlaceStyle} alt={'Marker'}/> <p>{this.props.name}</p></div>
        );
    }
}