import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { connect } from "react-redux";
import {getBlogList, deleteBlogData} from "../../services/action/index";
import Pagination from "react-js-pagination";


class BlogListAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.state = {
      activePage: 1,
      perPage: 10,
    };
  }

  componentDidMount() {
    this.props.getBlogList({
      page: this.state.activePage,
      limit: this.state.perPage
    });
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});

    this.props.getBlogList({
      page: pageNumber,
      limit: this.state.perPage
    });
  }

  deleteBlog = (e, blogId) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.deleteBlogData(blogId);
    this.props.getBlogList({
      page: this.state.activePage,
      limit: this.state.perPage
    });
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
              <table>
                <thead>
                <tr>
                  <th className="hide">ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                  {this.props.blogs.data.map(el => (
                    <tr key={el.id}>
                      <td className="hide">{el.id}</td>
                      <td>{el.title}</td>
                      <td>
                        <button className="button btn-theme mr-2" onClick={() => this.props.history.push(`/blog-details/${el.id}`)}>Edit</button>
                        <button className="button btn-theme" onClick={(e) => this.deleteBlog(e, el.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav aria-label="Page navigation" className="blog-pagination">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.perPage}
                  totalItemsCount={this.props.blogs.totalCount}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  innerClass={"pagination justify-content-center blog-pagin"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                  linkClassPrev={"page-link"}
                  linkClassNext={"page-link"}
                  linkClassFirst={"page-link"}
                  linkClassLast={"page-link"}
                />
              </nav>
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
    getBlogList: (pagination) => dispatch(getBlogList(pagination)),
    deleteBlogData: (blogId) => dispatch(deleteBlogData({blogId}))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogListAdmin);