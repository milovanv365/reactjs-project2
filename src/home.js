import React from 'react';
import About from './components/about';
import Feature from './components/feature';
import Work from './components/work';
import ScreenShot from './components/screenshot';
import Team from './components/team';
import Blog from './components/blog';
import Price from './components/price';
import Testimonial from './components/testimonial';
import FAQ from './components/faq';
import Contact from './components/contact';
import Subscribe from './components/subscribe';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render() {

		let token = localStorage.getItem('token')

		document.body.classList.remove('inner-page');
		return (
			<div className="inner-page" data-spy="scroll" data-target=".navbar" data-offset="75">
				{/* Navbar Section*/}
				{/*<nav className="navbar navbar-expand-lg  theme-nav fixed-top">*/}
				{/*	<div className="container">*/}
				{/*		<a className="navbar-brand" href={`${process.env.PUBLIC_URL}/`}><img src="assets/images/logo.png" alt="logo" /></a>*/}
				{/*		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainmenu" aria-expanded="false" aria-label="Toggle navigation">*/}
				{/*			<span className="navbar-toggler-icon"><i className="fa fa-align-justify" aria-hidden="true"></i></span>*/}
				{/*		</button>*/}
				{/*		<div className="collapse navbar-collapse" id="mainmenu">*/}
				{/*			<ul className="navbar-nav ml-auto" id="mymenu">*/}
				{/*				<li className="nav-item ">*/}
				{/*					<a className="nav-link" href="/" >Home</a>*/}
				{/*				</li>*/}
				{/*				<li className="nav-item">*/}
				{/*					<a className="nav-link" href="#feature">Features</a>*/}
				{/*				</li>*/}
				{/*				<li className="nav-item">*/}
				{/*					<a href="/coming-soon" className="nav-link">Blog</a>*/}
				{/*				</li>*/}
				{/*				<li className="nav-item">*/}
				{/*					<a className="nav-link" href="#contact">contact us</a>*/}
				{/*				</li>*/}
				{/*				<li className="nav-item dropdown">*/}
				{/*					<a className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Other Page</a>*/}
				{/*					<ul className="dropdown-menu">*/}
				{/*						{token === null && (*/}
				{/*						<React.Fragment>*/}
				{/*							<li className="nav-item"><Link className="nav-link" to={`${process.env.PUBLIC_URL}/sign-in`}>Sign In</Link></li>*/}
				{/*							<li className="nav-item"><Link className="nav-link" to={`${process.env.PUBLIC_URL}/sign-up`}>Sign Up</Link></li>*/}
				{/*						</React.Fragment>)}*/}
				{/*					</ul>*/}
				{/*				</li>*/}
				{/*			</ul>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</nav>*/}

				<Navbar />
				{/* Home One Section Start */}
				<section className="slide-bg" id="home">
					<div className="animation-circle">
						<i></i>
						<i></i>
						<i></i>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<div className="d-flex-1">
									<div className="slide-text">
										<div>
											<h1>The best way to collaborate with your team
											</h1>
											<h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h4>
											<div className="slid-btn">
												<a href=""><img src="assets/images/app1.png" alt="app1" className="img-fluid" data-tilt data-tilt-perspective="50" data-tilt-speed="350" data-tilt-max="1.8" /></a>
												<a href=""><img src="assets/images/app2.png" alt="app2" className="img-fluid" data-tilt data-tilt-perspective="50" data-tilt-speed="350" data-tilt-max="1.8" /></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="home-right">
									<div className="mobile-slid">
										<img src="assets/images/teamwork.png" alt="top1" className="img-fluid" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Home One Section End */}

				{/*Work Component*/}
				<Work />

{/*Feature Component*/}
				<Feature />
				{/*Testimonial Component*/}
				<Testimonial />

				{/*Footer Component*/}
				<Footer />

				{/*tap-top*/}
				<div className="tap-top">
					<div>
						<i className="fa fa-angle-up" aria-hidden="true"></i>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;