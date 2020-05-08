import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Editor } from '@tinymce/tinymce-react';
import { getTinymce } from '@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE';
// import tinymce from 'tinymce';

class BlogPublish extends React.Component {
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
							<form className="blog-post-form">
								<div className="form-group mb-4">
									<label htmlFor="title">Title</label>
									<input type="text" name="title"  className="form-control" id="title" placeholder="Enter Blog Title" required />
								</div>
								<div className="form-group my-4">
									<label htmlFor="title">Content</label>
									<Editor
										apiKey="w2wbc3orzcggh10rej63iwbpvxqc3zcvn0i6mhams8sipgxk"
										initialValue="<p>This is the initial content of the editor</p>"
										init={{
											height: 500,
											// menubar: "insert",
											plugins: [
												'advlist autolink lists link image charmap print preview anchor',
												'searchreplace visualblocks code fullscreen',
												'insertdatetime media table paste code help wordcount'
											],
											toolbar: 'undo redo | formatselect | ' +
												'bold italic backcolor | alignleft aligncenter ' +
												'alignright alignjustify | bullist numlist outdent indent | ' +
												'removeformat | help',
											file_picker_callback: function (cb, value, meta) {
												var input = document.createElement('input');
												input.setAttribute('type', 'file');
												input.setAttribute('accept', 'image/*');

												/*
                          Note: In modern browsers input[type="file"] is functional without
                          even adding it to the DOM, but that might not be the case in some older
                          or quirky browsers like IE, so you might want to add it to the DOM
                          just in case, and visually hide it. And do not forget do remove it
                          once you do not need it anymore.
                        */

												input.onchange = function () {
													debugger;
													var file = this.files[0];

													var reader = new FileReader();
													reader.onload = function (e) {
														var id = 'blobid' + (new Date()).getTime();
														var blobCache =  getTinymce().activeEditor.editorUpload.blobCache;
														var base64 = reader.result.split(',')[1];
														var blobInfo = blobCache.create(id, file, base64);
														blobCache.add(blobInfo);

														cb(blobInfo.blobUri(), { title: file.name });
													};
													reader.readAsDataURL(file);
												};

												input.click();
											}
										}}
										onEditorChange={this.handleEditorChange}
									/>
								</div>
								<div className="form-group mb-4">
									<label htmlFor="tag">Tag</label>
									<input type="text" name="tag"  className="form-control" id="tag" placeholder="Enter Blog Tag" required />
								</div>
								<div className="form-button text-center">
									<button type="button" className="btn btn-theme theme-color mr-5">Save draft</button>
									<button type="button" className="btn btn-theme theme-color ml-5">Publish</button>
								</div>
							</form>
						</div>
					</section>
					<Footer />
				</div>
			</div>
		);
	}
}

export default BlogPublish;