import React, {Component} from 'react';
import './KeyComponent.css'
import Bar from '../../assets/markers/bar-marker.png'
import Brewery from '../../assets/markers/keg-marker.png'
export default class KeyComponent extends Component {
    render() {
        return (
            <div className={'key-component'}>
                <p>Key</p>
                <div><span> Bar:</span> <img src={Bar} style={{height:'50px'}} alt={'Bar'}/></div>
                <div><span> Brewery:</span> <img src={Brewery} style={{width:'50px'}} alt={'Brewery'}/></div>
            </div>
        );
    }
}