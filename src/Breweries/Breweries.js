import React from "react";
import JournalContext from '../contexts/UserContext';
import './Breweries.css';
import Header from '../Header/Header';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker'
import MapsApiService from '../services/maps-api-service'

class Dashboard extends React.Component {

    static contextType = JournalContext;

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11,
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
        MapsApiService.getArea(this.state.value).then(res=> console.log(res, 'hgasetheasjikdfh'))
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
                            defaultCenter={this.state.center}
                            defaultZoom={this.state.zoom}
                        >
                            <Marker
                                lat={59.955413}
                                lng={30.337844}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div>
                </main>
            </>
        )
    }
}

export default Dashboard;