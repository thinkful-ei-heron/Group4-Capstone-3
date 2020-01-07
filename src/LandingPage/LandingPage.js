import React from "react";
import deerBear from "/assets/img/deerbear.png"

class LandingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <main className={'landing-page'}>
                <h1>The Deer Bear App</h1>
                <nav>
                    <Link to={'/login'}>Log-in</Link>
                    <Link to={'/register'}>Register</Link>
                </nav>
                <p>Tomato</p>
                <p>Tomato</p>
                <p>Tomato</p>
                <p>Tomato</p>
                <img src={deerBear} width={'100px'}/>

            </main>
        )
    }
}
export default LandingPage;