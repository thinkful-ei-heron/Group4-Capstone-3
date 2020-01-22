import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './EmptyList.css';
class EmptyList extends Component {
    render() {
        return( <div className={'empty-list'}>
            <h2>Drink Some Beer You Filthy Animal</h2>
            <Link to={'/add/tutorial'}>Add Your First Beer</Link>
        </div>)
    }
}
export default EmptyList;