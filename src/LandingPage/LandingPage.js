import React from "react";
import {Link} from "react-router-dom";
import './LandingPage.css'
class LandingPage extends React.Component {
        super(props);
        this.state = {

        this.state = {}
    }

    render() {
        return (
            <main className={'landing-page'}>
                <header>Parrallaxing Banner .33 head</header>
                <h1>The Dear Beer App</h1>
                <nav>
                    <Link to={'/login'}>Log-in</Link>
                    <Link to={'/register'}>Register</Link>
                </nav>
                <section className={'landing-page-about'}>
                    <div>
                        <h2>About</h2>
                        <p>Info Info Info Good Tomato</p>
                    </div>
                    <figure>
                        <img src={require("../assets/img/deerbear.png")} alt={'The Deer Bear'} width={'150px'}/>
                        <figcaption>The Deer Bear</figcaption>
                    </figure>
                </section>
                <section className={'landing-page-audience'}>
                        <h2>Target Audience</h2>
                        <p>Beer Drinkers</p>
                </section>
                <section>
                    <h2>Contact</h2>
                    <p>OOF</p>
                </section>
                <footer> @Copyright 2020</footer>
            </main>
        )
    }
}

export default LandingPage;