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
            nearByBars: [],
            nearByBreweries: [],
            list: [],
            value: '',
            selectedMarker: {lat: null, lng: null, name: '', vicinity: '', id: ''}
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.resetSelected = this.resetSelected.bind(this);
    }

    handleInput(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        MapsApiService.getArea({zipcode: this.state.value}).then(res => {
            let {lat, lng} = res.results;
            let zipcode = Math.sqrt((lat * lat) + (lng * lng));
            let list = [...res.breweries, ...res.bars];
            list.sort((a, b) => {
                let x = Math.abs(Math.sqrt((a.geometry.location.lat * a.geometry.location.lat) + (a.geometry.location.lng * a.geometry.location.lng)) - zipcode);
                let y = Math.abs(Math.sqrt((b.geometry.location.lat * b.geometry.location.lat) + (b.geometry.location.lng * b.geometry.location.lng)) - zipcode);
                return x - y;
            });
            this.setState({center: {lat, lng}, nearByBars: res.bars, nearByBreweries: res.breweries, list: list});
        })
        
    }

    updateSelected(id) {
        let NewPlace = this.state.list.find((place) => place.id === id);
        this.setState({selectedMarker: {
                lat: NewPlace.geometry.location.lat,
                lng: NewPlace.geometry.location.lng,
                name: NewPlace.name,
                vicinity: NewPlace.vicinity,
                id: NewPlace.id
            }});

    }
    resetSelected(){
        this.setState({selectedMarker: {lat: null, lng: null, name: '', vicinity: '', id: ''}});
    }
    render() {
        return (
            <>
                <main className='breweries-page'>
                    <Header location={this.props.location} header={'Breweries'}/>
                    <form onSubmit={this.handleSubmit}>
                        <label>Zip Code: <input type='number' onChange={this.handleInput}
                                                value={this.state.value}/></label>
                        <button type='submit'>Go</button>
                    </form>
                    <div className={'breweries-map'}>
                        <div className={'breweries-list'}>
                            {this.state.list.map((place, i) =>
                                <div key={i} className={(place.id===this.state.selectedMarker.id) ? 'breweries-list-active' : ''} onClick={() => this.setState({
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
                                })}><ListComponent place={place} /></div>
                            )}
                        </div>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyCG_FMdGssqTRG7tGSvu24UYFopSWQY_-g'}}
                            defaultCenter={this.state.defaultCenter}
                            defaultZoom={this.state.zoom}
                            center={this.state.center}
                        >
                            {this.state.nearByBars.map((place, i) => <BarMarker
                                key={i}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                                text={place.name}
                                id={place.id}
                                updateSelected={this.updateSelected}
                            />)}
                            {this.state.nearByBreweries.map((place, i) => <BreweryMarker
                                key={i}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                                text={place.name}
                                id={place.id}
                                updateSelected={this.updateSelected}
                            />)}
                            {this.state.selectedMarker.name.length !== 0 ? <InfoMarker
                                lat={this.state.selectedMarker.lat}
                                lng={this.state.selectedMarker.lng}
                                name={this.state.selectedMarker.name}
                                vicinity={this.state.selectedMarker.vicinity}
                                resetSelected={this.resetSelected}
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