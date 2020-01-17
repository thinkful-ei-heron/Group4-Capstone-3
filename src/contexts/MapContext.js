import React, { Component } from 'react';
const MapContext = React.createContext({
    center: {
        lat: 40.038629,
        lng: -105.3716684
    },
    nearByBars: [],
    nearByBreweries: [],
    list: [],
    value: '',
    selectedMarker: {lat: null, lng: null, name: '', vicinity: '', id: ''},
    setBars: ()=>{},
    setBreweries: ()=> {},
    setList: ()=> {},
    setSelected: ()=> {},
    setCenter: ()=> {},
    setZipcode: ()=> {},
    resetSelected: ()=> {},
    resetAll: ()=> {},
    updateSelected: ()=> {},
});

export default MapContext

export class MapProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 40.038629,
                lng: -105.3716684
            },
            nearByBars: [],
            nearByBreweries: [],
            list: [],
            value: '',
            selectedMarker: {lat: null, lng: null, name: '', vicinity: '', id: ''},
        };
        this.updateSelected = this.updateSelected.bind(this);
        this.resetSelected = this.resetSelected.bind(this);
        this.setBars = this.setBars.bind(this);
        this.setBreweries = this.setBreweries.bind(this);
        this.setList = this.setList.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.setCenter = this.setCenter.bind(this);
        this.setZipcode = this.setZipcode.bind(this);
        this.resetAll = this.resetAll.bind(this);
    }
    setBars = nearByBars => {this.setState({ nearByBars })};
    setBreweries = nearByBreweries => {this.setState({ nearByBreweries })};
    setList = list => {this.setState({ list })};
    setSelected = selectedMarker => {this.setState({ selectedMarker })};
    setCenter = center => {this.setState({ center })};
    setZipcode = value => {this.setState({ value })};
    resetSelected(){this.setState({selectedMarker: {lat: null, lng: null, name: '', vicinity: '', id: ''}});}
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
    resetAll = () => {
        this.setState({
            center: {
                lat: 40.038629,
                lng: -105.3716684
            },
            nearByBars: [],
            nearByBreweries: [],
            list: [],
            value: '',
            selectedMarker: {lat: null, lng: null, name: '', vicinity: '', id: ''},
        })
    };


    render() {
        let value = {
            center: this.state.center,
            nearByBars: this.state.nearByBars,
            nearByBreweries: this.state.nearByBreweries,
            list: this.state.list,
            value: this.state.value,
            selectedMarker: this.state.selectedMarker,
            setBars: this.setBars,
            setBreweries: this.setBreweries,
            setList:  this.setList,
            setSelected: this.setSelected,
            setCenter: this.setCenter,
            setZipcode: this.setZipcode,
            resetSelected: this.resetSelected,
            updateSelected: this.updateSelected,
            resetAll: this.resetAll,
        };
        return (
            <MapContext.Provider value={value}>
                {this.props.children}
            </MapContext.Provider>
        )
    }
}
