import React from "react";
import JournalContext from '../contexts/UserContext';
import './Breweries.css';
import Header from '../Header/Header';
import GoogleMapReact from 'google-map-react';
import BarMarker from './Marker/BarMarker'
import BreweryMarker from './Marker/BreweryMarker'
import InfoMarker from './Marker/InfoMarker'
import MapsApiService from '../services/maps-api-service'
import ListComponent from './ListComponent/ListComponent'
import KeyComponent from './KeyComponent/KeyComponent'
import config  from '../config'
class Dashboard extends React.Component {

    static contextType = JournalContext;

    constructor(props) {
        super(props);
        this.state = {
            defaultCenter: {
                lat: 40.038629,
                lng: -105.3716684
            },
            center: {
                lat: 40.038629,
                lng: -105.3716684
            },
            zoom: 11,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.map !== this.props.map) {
            this.forceUpdate();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        MapsApiService.getArea({zipcode: this.props.map.value}).then(res => {
            let {lat, lng} = res.results;
            let zipcode = Math.sqrt((lat * lat) + (lng * lng));
            let list = [...res.breweries, ...res.bars];
            list.sort((a, b) => {
                let x = Math.abs(Math.sqrt((a.geometry.location.lat * a.geometry.location.lat) + (a.geometry.location.lng * a.geometry.location.lng)) - zipcode);
                let y = Math.abs(Math.sqrt((b.geometry.location.lat * b.geometry.location.lat) + (b.geometry.location.lng * b.geometry.location.lng)) - zipcode);
                return x - y;
            });
            this.props.map.setList(list);
            this.props.map.setBars(res.bars);
            this.props.map.setBreweries(res.breweries);
            this.props.map.setCenter( {lat, lng});
        })
    }
    setActive(data){
        this.props.map.setCenter({lat: data.center.lat, lng: data.center.lng});
        this.props.map.setSelected(data.selectedMarker);

    }

    render() {
        return (
            <>
                <main className='breweries-page'>
                    <Header location={this.props.location} header={'Breweries'}/>
                    <form onSubmit={this.handleSubmit}>
                        <label>Zip Code: <input type='number'
                                                onChange={(e) => this.props.map.setZipcode(e.target.value)}
                                                value={this.props.map.value}/></label>
                        <button className={'clear-submit-back-btn'} type='submit'>Go</button>
                    </form>
                    <div className={'breweries-map'}>
                        <div className={'breweries-list'}>
                            {this.props.map.list.map((place, i) =>
                                <div key={i}
                                     className={(place.id === this.props.map.selectedMarker.id) ? 'breweries-list-active' : ''}
                                     onClick={() => this.setActive({
                                         center: {
                                             lat: place.geometry.location.lat,
                                             lng: place.geometry.location.lng
                                         },
                                         selectedMarker: {
                                             lat: place.geometry.location.lat,
                                             lng: place.geometry.location.lng,
                                             name: place.name,
                                             vicinity: place.vicinity,
                                             id: place.id
                                         }
                                     })}><ListComponent place={place}/></div>
                            )}
                        </div>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: config.API_KEY}}
                            defaultCenter={this.state.defaultCenter}
                            defaultZoom={this.state.zoom}
                            center={this.props.map.center}
                        >
                            {this.props.map.nearByBars.map((place, i) => <BarMarker
                                key={i}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                                text={place.name}
                                id={place.id}
                                updateSelected={this.props.map.updateSelected}
                            />)}
                            {this.props.map.nearByBreweries.map((place, i) => <BreweryMarker
                                key={i}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                                text={place.name}
                                id={place.id}
                                updateSelected={this.props.map.updateSelected}
                            />)}
                            {this.props.map.selectedMarker.name.length !== 0 ? <InfoMarker
                                lat={this.props.map.selectedMarker.lat}
                                lng={this.props.map.selectedMarker.lng}
                                name={this.props.map.selectedMarker.name}
                                vicinity={this.props.map.selectedMarker.vicinity}
                                resetSelected={this.props.map.resetSelected}
                            /> : ''}
                        </GoogleMapReact>
                        <KeyComponent/>
                    </div>
                </main>
            </>
        )
    }
}

export default Dashboard;