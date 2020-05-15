import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import {getBlogList} from "../../services/action";
import {connect} from "react-redux";

class BlogList extends React.Component {
	componentDidMount() {
		this.props.getBlogList();
	}

	render() {
		document.body.classList.remove('landing-page');
		document.body.classList.add('inner-page');

		return (
			<div>
				<Navbar />

				<div className="page-margin">
					{/*breadcrumb start*/}
					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-sm-6 d-align-center">
									<h2 className="title"><span> Blog</span></h2>
								</div>
								<div className="col-md-6 col-sm-6">
									<nav aria-label="breadcrumb" className="theme-breadcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href={`${process.env.PUBLIC_URL}/`}>Home</a></li>
											<li className="breadcrumb-item active"><a href={null}>Blog</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*breadcrumb end*/}

					{/*blog Section start*/}
					<section className="blog-page">
						<div className="container">
							<div className="row blog-list">
								{this.props.blogs.map(el => (
									<div className="col-lg-6 col-md-12" key={el.id}>
										<div className="item news-slid">
											<a href={`${process.env.PUBLIC_URL}/blog-details/${el.id}`}>
												<div className="news-box">
													<img src="/assets/images/blog/1.jpg" alt="news-1" className="img-fluid"/>
												</div>
											</a>
											<div className="news-text">
												<div className="blog-hover">
													<h4>{ el.title }</h4>
													<ul className="list-inline blog-details-list">
														<li><a href={null}>{ el.author }</a></li>
														<li><a href={null}>{ el.date }</a></li>
														<li><a href={null}>{ el.comments } comments</a></li>
														<li><a href={null}>{ el.views } View</a></li>
													</ul>
												</div>
												<p>{ el.description }</p>
												<a href={`${process.env.PUBLIC_URL}/blog-details/${el.id}`} className="btn-theme">View more</a>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="row">
								{/*paginations*/}
								<div className="col-md-12">
									<nav aria-label="Page navigation" className="blog-pagination">
										<ul className="pagination justify-content-center blog-pagin">
											<li className="page-item">
												<a className="page-link" href={null} aria-label="Previous">
													<i className="fa fa-angle-left" aria-hidden="true"></i>
												</a>
											</li>
											<li className="page-item active"><a className="page-link" href={null}>1</a></li>
											<li className="page-item"><a className="page-link" href={null}>2</a></li>
											<li className="page-item"><a className="page-link" href={null}>3</a></li>
											<li className="page-item">
												<a className="page-link" href={null} aria-label="Next">
													<i className="fa fa-angle-right" aria-hidden="true"></i>
												</a>
											</li>
										</ul>
									</nav>
								</div>
								{/*paginations end*/}
							</div>
						</div>

						<div className="animation-circle absolute">
							<i></i>
							<i></i>
							<i></i>
						</div>
						<div className="animation-circle-inverse">
							<i></i>
							<i></i>
							<i></i>
						</div>

					</section>
					{/*blog Section End*/}
					{/*Footer Section start*/}
					<Footer />
					{/*Footer Section End*/}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		blogs: state.blogs
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getBlogList: () => dispatch(getBlogList()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogList);