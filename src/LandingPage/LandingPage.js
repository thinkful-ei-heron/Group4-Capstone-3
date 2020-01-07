import React from "react";
import {Link} from "react-router-dom";

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
                <img src={require("../assets/img/deerbear.png")} width={'100px'}/>

            </main>
        )
    }
}
export default LandingPage;