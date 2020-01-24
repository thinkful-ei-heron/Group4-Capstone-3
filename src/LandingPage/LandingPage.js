import React from 'react';
import { Link } from 'react-router-dom';
import { ParallaxBanner } from 'react-scroll-parallax';
import bg1 from '../assets/img/bg1.jpg';
import './LandingPage.css';
import logo from '../assets/img/logo.png';
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
					<div className="header-logo-h1">
						<h1>DearBeer</h1>
					</div>
				</ParallaxBanner>

				<section className={'landing-page-about'}>
					<img className="logo" src={logo} alt="logo" />
					<h2>About</h2>

					<h3 className="para-1">A place to save your favorite beers.</h3>

					<figure>
						<img
							className="deerbear-img"
							src={require('../assets/img/deerbear.png')}
							alt={'The Deer Bear'}
							width={'150px'}
						/>
						<figcaption>Henri le Biere</figcaption>
					</figure>

					<p className="para-2">
						With the popularity of craft breweries increasing, sometimes it’s hard to remember what you
						drank, where you drank it, and most importantly, if you liked it. DearBeer is here to help. It
						allows users to save any beer they want by adding name, location, type, color, ABV, description,
						etc. It easily stores and allows you to access any beer you have added to your dashboard. Next
						time you forget that delicious beer you had on a 7 hour layover in Denver, don’t fret because
						you’ll be able to remember it with DearBeer and enjoy it once again. Cheers, and if your cup is
						full may it be again.
					</p>

					<figure>
						<h2>Map</h2>
						<img
							className="map-img"
							src={require('../assets/img/map.png')}
							alt={'map of brews'}
							width={'150px'}
						/>
						<p className="map-desc">
							DearBeer allows a user to search for breweries and bars around them showing them where the
							nearest place to grab a drink is. The map depicts places in the US based on a zipcode input.
							It tells the user the location, rating, number, and if it's open or closed. From the map a
							user is also able to click a place and add a beer to their list for that location.
						</p>
					</figure>
					<h2>Demo</h2>
					<iframe  src="https://www.youtube.com/embed/SMtgKzEvPPw" frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
				</section>

				<footer> @Copyright 2020</footer>
			</main>
		);
	}
}

export default LandingPage;
