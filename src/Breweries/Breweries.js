import React from "react";
import JournalContext from '../contexts/UserContext';
import './Breweries.css';
import Header from '../Header/Header';
import GoogleMapReact from 'google-map-react';
import BarMarker from './Marker/BarMarker';
import BreweryMarker from './Marker/BreweryMarker';
import MapsApiService from '../services/maps-api-service';
import ListComponent from './ListComponent/ListComponent';

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
            dropDown: 8047
        };
        this.handleInput = this.handleInput.bind(this);
        // this.handleDropdown = this.handleDropdown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {

        this.setState({value: e.target.value})
    }

    // handleDropdown(e) {
    //     // console.log(e.target.value);
    //     this.setState({dropDown: e.target.value})
    // }

    handleSubmit(e) {
        e.preventDefault();
        MapsApiService.getArea({zipcode: this.state.value}).then(res => {
            let {lat, lng} = res.results;
            console.log(lat, lng)
            let list = [...res.breweries, ...res.bars];
            list.sort((a,b)=> {
                let zipcode = Math.sqrt((lat*lat)+(lng*lng));
                let x = Math.abs(Math.sqrt((a.geometry.location.lat *a.geometry.location.lat )+(a.geometry.location.lng *a.geometry.location.lng ))-zipcode);
                let y = Math.abs(Math.sqrt((b.geometry.location.lat *b.geometry.location.lat )+(b.geometry.location.lng *b.geometry.location.lng ))-zipcode);
               return x-y;
            });
            this.setState({center: {lat, lng}, nearByBars: res.bars, nearByBreweries: res.breweries, list});
        })
    }

    render() {
        // let distances = [{meters: 8047, miles: 5}, {meters: 16093.4, miles: 10}, {
        //     meters: 24140.2,
        //     miles: 15
        // }, {meters: 32187, miles: 20}, {meters: 40233.6, miles: 25}];
        return (
            <>
                <main className='breweries-page'>
                    <Header location={this.props.location} header={'Breweries'}/>
                    <form onSubmit={this.handleSubmit}>
                        <label>Zip Code: <input type='number' onChange={this.handleInput}
                                                value={this.state.value}/></label>
                        {/*<select onChange={this.handleDropdown}>*/}
                        {/*    {distances.map((dist, i) => <option key={i} value={dist.meters}>{dist.miles}</option>)}*/}
                        {/*</select>*/}
                        <button type='submit'>Go</button>
                    </form>
                    <div
                        style={{height: '75vh', width: '95%', display: 'inline-flex', justifyContent: 'space-between'}}>
                        <div className={'breweries-list'}>
                            {this.state.list.map((place, i) =>
                                <div key={i} onClick={() => this.setState({
                                    center: {
                                        lat: place.geometry.location.lat,
                                        lng: place.geometry.location.lng
                                    }
                                })}><ListComponent place={place}/></div>
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
                                isBeer={false}
                            />)}
                            {this.state.nearByBreweries.map((place, i) => <BreweryMarker
                                key={i}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                                text={place.name}
                                isBeer={false}
                            />)}
                        </GoogleMapReact>
                    </div>
                </main>
            </>
        )
    }
}

export default Dashboard;