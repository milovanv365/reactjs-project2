import React from 'react';


class Footer extends React.Component {

    componentWillMount() {
        
    }
  render() {
		
  	return (
        <div>
        <div id="fb-root"></div>
            <footer className="cpoy-right-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="social-footer">
                                <ul>
                                    <li><a href={null}  dangerouslySetInnerHTML={{ __html: '<i class="fa fa-facebook" aria-hidden="true"></i>' }}></a></li>
                                    <li><a href={null} dangerouslySetInnerHTML={{ __html: '<i class="fa fa-google-plus" aria-hidden="true"></i>' }}></a></li>
                                    <li><a href={null}  dangerouslySetInnerHTML={{ __html: '<i class="fa fa-twitter" aria-hidden="true"></i>' }}></a></li>
                                    <li><a href={null}  dangerouslySetInnerHTML={{ __html: '<i class="fa fa-instagram" aria-hidden="true"></i>' }}></a></li>
                                    <li><a href={null} dangerouslySetInnerHTML={{ __html: '<i class="fa fa-rss" aria-hidden="true"></i>' }}></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <p className="copyright">2020 Copyrights by Teamistry</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
  	);
  }
}


export default Footer;