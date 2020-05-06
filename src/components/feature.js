import React from 'react';


class Feature extends React.Component {
  render() {
		
  	return (
        <section className="theme-bg feature" id="feature">
           <div className="container">
              <div className="animation-circle-inverse">
                 <i></i>
                 <i></i>
                 <i></i>
              </div>
              <div className="row">
                 <div className="col-md-12 text-center">
                    <div className="section-title">
                       <h2 className="text-white">Teamistry Features</h2>
                       <img src="assets/images/white-line.png" alt="white-line" className="img-fluid"/>
                    </div>
                 </div>
                 <div className="col-lg-4 col-sm-6">
                    <div className="future-box">
                       <div className="future-timeline">
                          <ul >
                             <li className="timeline">
                                <h4 className="sub-title">High Flexibility</h4>
                                <p className="">Design work structures as you like</p>
                             </li>
                             <li className="timeline">
                                <h4 className="sub-title">Stakeholder Visibility</h4>
                                <p className="">Showcase your progress, hastle-free</p>
                             </li>
                             
                          </ul>
                       </div>
                    </div>
                 </div>
                 <div className="col-md-4 future-mobile">
                    <img src="assets/images/feature-mob.png" alt="feature-mob" className="img-fluid"/>
                 </div>
                 <div className="col-lg-4 col-sm-6">
                    <div className="future-box">
                       <div className="future-timeline-right">
                          <ul className="text-left">
                          <li className="timeline-right">
                                <h4 className="sub-title">Multiple Teams</h4>
                                <p className="">Manage or be part of multiple teams</p>
                             </li>
                             <li className="timeline-right">
                                <h4 className="sub-title">Role-based Invitations</h4>
                                <p className="">Control who can see what</p>
                             </li>
                          </ul>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
  	);
  }
}


export default Feature;