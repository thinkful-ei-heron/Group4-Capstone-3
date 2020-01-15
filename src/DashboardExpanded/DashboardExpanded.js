import React from 'react';
import UserContext from '../contexts/UserContext';
import Utils from '../Utils/Utils';
import './DashboardExpanded.css';

class DashboardExpanded extends React.Component {
	static contextType = UserContext;

	constructor(props) {
		super(props);
		this.state = {
			journal: this.props.journal,
			isEditable: false,
			name: '',
			date_created: '',
			location: '',
			description: '',
			type: '',
			rating: 0,
			abv: 0,
			heaviness: 0,
			color: 0
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps !== this.props) {
			this.setState({
				name: this.props.journal.name,
				date_created: this.props.journal.date_created,
				location: this.props.journal.location,
				description: this.props.journal.description,
				type: this.props.journal.type,
				rating: this.props.journal.rating,
				abv: this.props.journal.abv,
				heaviness: this.props.journal.heaviness,
				color: this.props.journal.color
			});
			this.forceUpdate();
		}
	}

	handleName = (e) => {
		this.setState({ name: e.target.value });
	};
	handleDate = (e) => {
		this.setState({ date_created: e.target.value });
	};
	handleLoc = (e) => {
		this.setState({ location: e.target.value });
	};
	handleDesc = (e) => {
		this.setState({ description: e.target.value });
	};
	handleType = (e) => {
		this.setState({ type: e.target.value });
	};
	handleRating = (e) => {
		this.setState({ rating: e.target.value });
	};
	handleAbv = (e) => {
		this.setState({ abv: e.target.value });
	};
	handleHeaviness = (e) => {
		this.setState({ heaviness: e.target.value });
	};
	handleColor = (e) => {
		this.setState({ color: e.target.value });
	};

	toggleIsEditable = () => {
		this.setState({
			isEditable: !this.state.isEditable,
			name: this.props.journal.name,
			date_created: this.props.journal.date_created,
			location: this.props.journal.location,
			description: this.props.journal.description,
			type: this.props.journal.type,
			rating: this.props.journal.rating,
			abv: this.props.journal.abv,
			heaviness: this.props.journal.heaviness,
			color: this.props.journal.color
		});
	};

	render() {
		let x = this.state.isEditable ? (
			<form
				onSubmit={() =>
					this.props.handleSubmit(this.props.journal.id, {
						id: this.props.journal.id,
						name: this.state.name,
						date_created: this.state.date_created,
						location: this.state.location,
						description: this.state.description,
						type: this.state.type,
						rating: this.state.rating,
						abv: parseFloat(this.state.abv),
						heaviness: parseInt(this.state.heaviness),
						color: parseInt(this.state.color)
					})}
			>
				<figure>
					<img src={Utils.getImage(parseInt(this.state.color))} alt={'Beer'} width={'150px'} />
					<figcaption>
						ABV: <input type="number" value={this.state.abv} onChange={this.handleAbv} /> %
					</figcaption>
				</figure>
				<section>
					<label>
						Date: <input type="date" value={this.state.date_created} onChange={this.handleDate} />
					</label>
					<label>
						Name: <input type="text" value={this.state.name} onChange={this.handleName} />
					</label>
					<label>
						Location: <input type="text" value={this.state.location} onChange={this.handleLoc} />
					</label>
				</section>
				<input type="range" min="0" max="9" value={this.state.rating} onChange={this.handleRating} />
				<textarea value={this.state.description} onChange={this.handleDesc} />
				<h3>Dark to Light</h3>
				<input type="range" min="1" max="6" value={this.state.color} onChange={this.handleColor} />
				<h3>Heavy to Light</h3>
				<input type="range" min="1" max="5" value={this.state.heaviness} onChange={this.handleHeaviness} />
				<button onClick={this.toggleIsEditable}>Cancel</button>
				<button type={'submit'}>Submit</button>
			</form>
		) : (
            <>
                <div className='dashboard-expanded-section'>
                <section onClick={() => this.props.toggleExpanded(this.state.journal.id)}>
                    <figure>
                        <img src={Utils.getImage(this.state.journal.color)} alt={'Beer'} width={'150px'} />
                        <figcaption>ABV: {this.state.journal.abv} % </figcaption>
                    </figure>
                    <section>
                        <h3>
                            Date: <span>{Utils.formattedDate(this.state.journal.date_created)}</span>
                        </h3>
                        <h3>
                            Name: <span>{this.state.journal.name}</span>
                        </h3>
                        <h3>
                            Location: <span>{this.state.journal.location}</span>
                        </h3>
                    </section>
										<figure>
											<figcaption>Rating</figcaption>
											<img className='rating-img' src={Utils.getRatingImage(this.state.journal.rating)} alt={'Rating'} height={'50px'} />
										</figure>
                    {/* <input type="range" min="0" max="9" value={this.state.journal.rating} readOnly /> */}
                    <p>{this.state.journal.description}</p>
                    <h3>Dark to Light</h3>
                    <input type="range" min="1" max="6" value={this.state.journal.color} readOnly />
                    <h3>Heavy to Light</h3>
                    <input type="range" min="1" max="5" value={this.state.journal.heaviness} readOnly />
                </section>
                <button onClick={() => this.props.handleDelete(this.state.journal.id)}>Delete</button>
                <button onClick={this.toggleIsEditable}>Edit</button>
                </div>
            </>
		);
		return <li>{x}</li>;
	}
}

export default DashboardExpanded;
