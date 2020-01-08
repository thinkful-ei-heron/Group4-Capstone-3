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
      abv: 0,
      heaviness: 0,
      color: 0,
      image: 0
    };
    this.setName = this.setName.bind(this);
    this.setLoc = this.setName.bind(this);
    this.setDesc = this.setName.bind(this);
    this.setType = this.setName.bind(this);
    this.setRating = this.setName.bind(this);
    this.setAbv = this.setName.bind(this);
    this.setHeaviness = this.setName.bind(this);
    this.setColor = this.setName.bind(this);
    this.setImage = this.setName.bind(this);
  }
  setName = name => {this.setState({ name })};
  setLoc = location => {this.setState({ location })};
  setDesc = description => {this.setState({ description })};
  setType = type => {this.setState({ type })};
  setRating = rating => {this.setState({ rating })};
  setAbv = abv => {this.setState({ abv })};
  setHeaviness = heaviness => {this.setState({ heaviness })};
  setColor = color => {this.setState({ color })};
  setImage = image => {this.setState({ image })};

  render() {
    const value = {
      name: this.state.name,
      date_created: this.state.date_created,
      location: this.state.location,
      description:  this.state.description,
      type:  this.state.type,
      rating: this.state.rating,
      abv: this.state.abv,
      heaviness: this.state.heaviness,
      color: this.state.color,
      image: this.state.image,
      setName: this.setName,
      setLoc:  this.setLoc,
      setDesc: this.setDesc,
      setType: this.setType,
      setRating: this.setRating,
      setAbv: this.setAbv,
      setHeaviness: this.setHeaviness,
      setColor: this.setColor,
      setImage: this.setImage
    };
    return (
      <JournalContext.Provider value={value}>
        {this.props.children}
      </JournalContext.Provider>
    )
  }
}
