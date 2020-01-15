import React from "react";
import JournalContext from '../contexts/UserContext';
import './Breweries.css';
import Header from '../Header/Header';
import GoogleMapReact from 'google-map-react';
import BarMarker from './Marker/BarMarker'
import BreweryMarker from './Marker/BreweryMarker'
import MapsApiService from '../services/maps-api-service'

class Dashboard extends React.Component {

    static contextType = JournalContext;

    constructor(props) {
        super(props);
        this.state = {
            defaultCenter: {
                lat: 0,
                lng: 0
            },
            center: {
                lat: 0,
                lng: 0
            },
            zoom: 11,
            nearByBars: [],
            nearByBreweries: [],
            value: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    handleInput(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        MapsApiService.getArea(this.state.value).then(res=> {
            let {lat, lng} = res.results;
            console.log(res)
            this.setState({center: {lat, lng}, nearByBars: res.bars, nearByBreweries: res.breweries});
    })
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
                    <div style={{height: '100vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyCG_FMdGssqTRG7tGSvu24UYFopSWQY_-g'}}
                            defaultCenter={this.state.defaultCenter}
                            defaultZoom={this.state.zoom}
                            center={this.state.center}
                        >
                            {this.state.nearByBars.map((place, i)=><BarMarker
                                key={i}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                                text={place.name}
                                isBeer={false}
                            />)}
                            {this.state.nearByBreweries.map((place, i)=><BreweryMarker
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