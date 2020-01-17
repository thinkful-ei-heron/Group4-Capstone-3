import React, {Component} from 'react';
import BarIcon from '../../assets/markers/bar-marker.png';

export default class BarMarker extends Component {
    render() {
        const K_WIDTH = 30;
        const K_HEIGHT = 30;
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
            <img onClick={()=> this.props.updateSelected(this.props.id)} src={BarIcon} style={greatPlaceStyle} alt={'Bar Marker'}/>
        );
    }
}