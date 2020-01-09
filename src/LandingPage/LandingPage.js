import React from 'react';
import { Link } from 'react-router-dom';
import { ParallaxBanner } from 'react-scroll-parallax';
import bg1 from '../assets/img/bg1.jpg';
import './LandingPage.css';
class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<main className={'landing-page'}>
				<ParallaxBanner
					className="header"
					layers={[ { image: bg1, amount: 0.8 } ]}
					style={{ minHeight: '50vh', maxHeight: '50vh' }}
				>
					<nav>
						<Link to={'/login'}>Login</Link>
						<Link to={'/register'}>Register</Link>
					</nav>
					<h1>Dear Beer</h1>
				</ParallaxBanner>

				<section className={'landing-page-about'}>
					<div>
						<h2>About</h2>
						<p>Info Info Info Good Tomato</p>
					</div>
					<figure>
						<img src={require('../assets/img/deerbear.png')} alt={'The Deer Bear'} width={'150px'} />
						<figcaption>The Deer Bear</figcaption>
					</figure>
				</section>

				<footer> @Copyright 2020</footer>
			</main>
		);
	}
}

export default LandingPage;
