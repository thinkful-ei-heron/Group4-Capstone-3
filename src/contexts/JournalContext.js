import React, { Component } from 'react';
const JournalContext = React.createContext({
  name: '',
  date_created: '',
  location: '',
  description: '',
  type: '',
  rating: 0,
  abv: 0,
  heaviness: 0,
  color: 0,
  image: 0,
  setName: ()=>{},
  setLoc: ()=> {},
  setDesc: ()=> {},
  setType: ()=> {},
  setRating: ()=> {},
  setAbv: ()=> {},
  setHeaviness: ()=> {},
  setColor: ()=> {},
  setImage: ()=> {}
});

export default JournalContext

export class JournalProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date_created: '',
      location: '',
      description: '',
      type: '',
      rating: 0,
      apv: 0,
      heaviness: 0,
      color: 0,
      image: 0
    };
  }
  setDate = date_created => {this.setState({ date_created })};
  setName = name => {this.setState({ name })};
  setLoc = location => {this.setState({ location })};
  setDesc = description => {this.setState({ description })};
  setType = type => {this.setState({ type })};
  setRating = rating => {this.setState({ rating })};
  setApv = apv => {this.setState({ apv })};
  setHeaviness = heaviness => {this.setState({ heaviness })};
  setColor = color => {this.setState({ color })};
  setImage = image => {this.setState({ image })};

  resetAll = () => {
    this.setState({
      name: '',
      date_created: '',
      location: '',
      description: '',
      type: '',
      rating: 0,
      apv: 0,
      heaviness: 0,
      color: 0,
      image: 0
    })
  };
  
  render() {
    let value = {
      name: this.state.name,
      date_created: this.state.date_created,
      location: this.state.location,
      description:  this.state.description,
      type:  this.state.type,
      rating: this.state.rating,
      apv: this.state.apv,
      heaviness: this.state.heaviness,
      color: this.state.color,
      image: this.state.image,
      setDate: this.setDate,
      setName: this.setName,
      setLoc:  this.setLoc,
      setDesc: this.setDesc,
      setType: this.setType,
      setRating: this.setRating,
      setApv: this.setApv,
      setHeaviness: this.setHeaviness,
      setColor: this.setColor,
      setImage: this.setImage,
      resetAll: this.resetAll
    };
    return (
      <JournalContext.Provider value={value}>
        {this.props.children}
      </JournalContext.Provider>
    )
  }
}
