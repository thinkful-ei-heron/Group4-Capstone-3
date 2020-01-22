import React from 'react';
import UserContext from '../contexts/UserContext';
import Utils from '../Utils/Utils';
import ReactTooltip from 'react-tooltip';
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
			<form className ='edit-beer-form'
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
					})}>
				<section className='form-section'>
					<fieldset>
						<legend>Beer Information</legend>
						<figure>
							<img src={Utils.getImage(parseInt(this.state.color))} alt={'Beer'} width={'150px'} />
						</figure>
						<div>
							<label>
								Date: <input type="date" value={this.state.date_created} onChange={this.handleDate} />
							</label>
						</div>
						<div>
							<label>
								Location: <input type="text" value={this.state.location} onChange={this.handleLoc} />
							</label>
						</div>
						<div>
							<label>
									Name: <input type="text" value={this.state.name} onChange={this.handleName} />
							</label>
						</div>
						<div>
						<label>
								Type: 
								<select value={this.state.type} onChange={this.handleType}>
									<option value='Ale'>Ale</option>
									<option value='Altbier'>Altbier</option>
									<option value='American Lager'>American Lager</option>
									<option value='Barley Wine'>Barley Wine</option>
									<option value='Belgian'>Belgian</option>
									<option value='Berliner Weisse'>Berliner Weisse</option>
									<option value='Bitter'>Bitter</option>
									<option value='Bock'>Bock</option>
									<option value='Brown Ale'>Brown Ale</option>
									<option value='Cider'>Cider</option>
									<option value='Cream Ale'>Cream Ale</option>
									<option value='Doppelbock'>Doppelbock</option>
									<option value='Dunkel'>Dunkel</option>
									<option value='Flanders Red Ale'>Flanders Red Ale</option>
									<option value='German Pilser'>German Pilser</option>
									<option value='Gose'>Gose</option>
									<option value='Helles'>Helles</option>
									<option value='Helles Bock'>Helles Bock</option>
									<option value='Honey'>Honey</option>
									<option value='Imperial IPA'>Imperial IPA</option>
									<option value='IPA'>IPA</option>
									<option value='Irish Red Ale'>Irish Red Ale</option>
									<option value='Kolsch'>Kolsch</option>
									<option value='Lager'>Lager</option>
									<option value='Lambic'>Lambic</option>
									<option value='Mild ale'>Mild ale</option>
									<option value='Old Ale'>Old Ale</option>
									<option value='Pale Ale'>Pale Ale</option>
									<option value='Pale Lager'>Pale Lager</option>
									<option value='Pilsner'>Pilsner</option>
									<option value='Porter'>Porter</option>
									<option value='Quadrupel'>Quadrupel</option>
									<option value='Rye'>Rye</option>
									<option value='Saison'>Saison</option>
									<option value='Schwarzbier'>Schwarzbier</option>
									<option value='Scotch Ale'>Scotch Ale</option>
									<option value='Seasonal Beer'>Seasonal Beer</option>
									<option value='Stout'>Stout</option>
									<option value='Vienna lager'>Vienna lager</option>
									<option value='Wittbier'>Wittbier</option>
									<option value='Other'>Other</option>
								</select>
							</label>
						</div>
						<div>
							<label data-tip='Alcohol By Volume'>
							<ReactTooltip place="top" type="dark" effect="solid"/>
								ABV: <input type="number" value={this.state.abv} onChange={this.handleAbv} /> %
							</label>
						</div>
						<div>
							<h3 data-tip='Color of beer'>Dark to Light</h3>
							<input type="range" min="1" max="6" value={this.state.color} onChange={this.handleColor} />
						</div>
						<div>
							<h3 data-tip='Strength of alcohol'>Heavy to Light</h3>
							<input type="range" min="1" max="5" value={this.state.heaviness} onChange={this.handleHeaviness} />
						</div>
					</fieldset>
					<fieldset className='lastfield'>
						<legend>What I think about this beer!</legend>
						<div>
							<figure>
								<figcaption>Rating</figcaption>
								<img className='edit-rating-img' src={Utils.getRatingImage(parseInt(this.state.rating))} alt={'Rating icons'} height={'50px'} />
								<input type="range" min="0" max="9" value={this.state.rating} onChange={this.handleRating} />
							</figure>
						</div>
						<div>
							<label>
								Description <textarea value={this.state.description} onChange={this.handleDesc} />
							</label>
						</div>
						<div className="edit-buttons">
							<button className="clear-submit-back-btn" onClick={this.toggleIsEditable}>Cancel</button>
							<button className="clear-submit-back-btn"type={'submit'}>Submit</button>
						</div>
					</fieldset>
				</section>
			</form>
		) : (
            <>
                <div className='dashboard-expanded-section'>
                <section onClick={() => this.props.toggleExpanded(this.state.journal.id)}>
                    <figure>
                        <img className='beer-color' src={Utils.getImage(this.state.journal.color)} alt={'Beer'} width={'150px'} />
                        <figcaption>ABV: {this.state.journal.abv} % </figcaption>
                    </figure>
                    <section>
												<h3 className='expanded-beer-name'>
                            <span>{this.state.journal.name}</span>
                        </h3>
												<div className='expanded-small-details'>
													<h3 className='expanded-location'>
															<span>{this.state.journal.location}</span>
													</h3>
													<h3 className='expanded-type'>
															<span>{this.state.journal.type}</span>
													</h3>
												</div>
                    </section>
                    {/* <input type="range" min="0" max="9" value={this.state.journal.rating} readOnly /> */}
										<fieldset className='expanded-description'>
											<legend>
												<span className='expanded-date'>{Utils.formattedDate(this.state.journal.date_created)}</span>
											</legend>
											{this.state.journal.description}
										</fieldset>
										<div>
											<h3 className='expanded-slide-label'>Color</h3>
										</div>
										<section className='expanded-sliders-section'>
											<p>Light</p>
											<input type="range" min="1" max="6" value={this.state.journal.color} readOnly className='expanded-slider'/>
											<p>Dark</p>
										</section>
										<div>
											<h3 className='expanded-slide-label'>Flavor</h3>
										</div>
										<section className='expanded-sliders-section'>
											<p>Light</p>
											<input type="range" min="1" max="5" value={this.state.journal.heaviness} readOnly className='expanded-slider'/>
											<p>Heavy</p>
										</section>
										<figure>
											<img className='rating-img' src={Utils.getRatingImage(this.state.journal.rating)} alt={'Rating icons'} height={'50px'} />
										</figure>
                </section>
								<button className='clear-submit-back-btn'onClick={this.toggleIsEditable}>Edit</button>
                <button className='clear-submit-back-btn'onClick={() => this.props.handleDelete(this.state.journal.id)}>Delete</button>
                </div>
            </>
		);
		return <li>{x}</li>;
	}
}

export default DashboardExpanded;
