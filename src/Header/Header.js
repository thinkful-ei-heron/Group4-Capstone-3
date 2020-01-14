import React from "react";
import './Header.css'
import NavBar from '../NavBar/NavBar'

class Header extends React.Component {
    render() {
        return (
            <>
                <section className='header'>
                    <h2>{this.props.header}</h2>
                    <NavBar location={this.props.location}/>
                </section>
            </>
        )
    }
}

export default Header;