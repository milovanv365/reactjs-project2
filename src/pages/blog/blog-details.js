import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import {getBlogList, getBlog} from "../../services/action";
import {connect} from "react-redux";

class BlogDetails extends React.Component {
	componentDidMount() {
		const blogId = this.props.match.params.blogId;
		this.props.getBlog(blogId);
	}
	render() {
		document.body.classList.remove('landing-page');
		document.body.classList.add('inner-page');

		const {blog} = this.props
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
											<li className="breadcrumb-item active"><a href={null}>Blog details</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*breadcrumb end*/}

					{/*blog Section starts*/}
					<section className="blog-page">
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<div className="blog-details news-slid">
										<div className="news-box">
											<img src="/assets/images/blog/1.jpg" alt="news-1" className="img-fluid" />
										</div>
										<div className="news-text">
											<div className="blog-hover">
												<h4>{blog.title}</h4>
												<ul className="list-inline blog-details-list">
													<li><a href={null}>{blog.author}</a></li>
													<li><a href={null}>{blog.date}</a></li>
													<li><a href={null}>{blog.comments} comments</a></li>
													<li><a href={null}>{blog.views} View</a></li>
												</ul>
											</div>
											<p>{blog.content}</p>
										</div>
									</div>
									<div className="blog-divider"></div>
									<div className="reply-comment">
										<div className="media">
											<img className="align-self-top mr-3" src="/assets/images/blog/blog-comment.jpg" alt="blog" />
											<div className="media-body">
												<a href={null}>
													<h5 className="mt-0">Lorem Ipsum Is Simply Dummy</h5>
												</a>
												<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.Donec sed odio dui.</p>
											</div>
										</div>
										<div className="media">
											<img className="align-self-top mr-3" src="/assets/images/blog/blog-comment-two.jpg" alt="blog" />
											<div className="media-body">
												<a href={null}>
													<h5 className="mt-0">Lorem Ipsum has been the</h5>
												</a>
												<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.Donec sed odio dui.</p>
											</div>
										</div>
										<div className="media">
											<img className="align-self-top mr-3" src="/assets/images/blog/blog-comment-three.jpg" alt="blog" />
											<div className="media-body">
												<a href={null}>
													<h5 className="mt-0">all the Lorem Ipsum Generator</h5>
												</a>
												<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
											</div>
										</div>
									</div>
									<div className="blog-divider"></div>
									<div className="row">
										<div className="col-md-10 offset-md-1 leave-coment">
											<h3 className="text-center">Leave Your Comment</h3>
											<form className="theme-form p-0 mt-3">
												<div className="form-group">
													<div className="row">
														<div className="col-lg-6 col-md-12 md-fgrup-margin">
															<input type="text" className="form-control" placeholder="your name" />
														</div>
														<div className="col-lg-6 col-md-12">
															<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email address" />
														</div>
													</div>
												</div>
												<div className="form-group">
													<textarea className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="message"></textarea>
												</div>
												<div className="form-button">
													<button type="submit" className="btn btn-theme theme-color">send</button>
												</div>
											</form>
										</div>
									</div>
								</div>
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
		blog: state.blog
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getBlog: (blogId) => dispatch(getBlog({blogId})),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogDetails);
// export default BlogDetails;