import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Editor } from '@tinymce/tinymce-react';

class BlogPost extends React.Component {
	handleEditorChange = (content, editor) => {
		console.log('Content was updated:', content);
	}

	render() {
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

					<section className="blog-page">
						<div className="container">
							<Editor
								initialValue="<p>This is the initial content of the editor</p>"
								init={{
									height: 500,
									menubar: false,
									plugins: [
										'advlist autolink lists link image charmap print preview anchor',
										'searchreplace visualblocks code fullscreen',
										'insertdatetime media table paste code help wordcount'
									],
									toolbar:
										'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
								}}
								onEditorChange={this.handleEditorChange}
							/>
						</div>
					</section>
					<Footer />
				</div>
			</div>
		);
	}
}

export default BlogPost;