import React from "react";
import JournalContext from '../contexts/UserContext';
import './Breweries.css'
import Header from '../Header/Header'
class Dashboard extends React.Component {

    static contextType = JournalContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <main className='breweries-page'>
                    <Header location={this.props.location} header={'Breweries'}/>
                    <section className='dashboard-bottom'>
                    </section>
                </main>
            </>
        )
    }
}

export default Dashboard;