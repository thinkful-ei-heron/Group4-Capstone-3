import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './EmptyList.css';
class EmptyList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( <div className={'empty-list'}>
            <h2>Drink Some Beer You Filthy Animal</h2>
            <Link to={'/add/tutorial'}>Add Beer</Link>

        </div>)
    }
}
export default EmptyList;