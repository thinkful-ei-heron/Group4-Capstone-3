import React from "react";
import JournalContext from '../contexts/UserContext';
import './Breweries.css';
import Header from '../Header/Header';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker'
class Dashboard extends React.Component {

    static contextType = JournalContext;

    constructor(props) {
        super(props);
        this.state = {
            center: {
            lat: 59.95,
            lng: 30.33},
            zoom:11
        }

    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <main className='breweries-page'>
                    <Header location={this.props.location} header={'Breweries'}/>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key:'AIzaSyCG_FMdGssqTRG7tGSvu24UYFopSWQY_-g' }}
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