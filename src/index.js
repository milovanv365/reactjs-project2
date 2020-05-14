import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// import NoMatch from './pages/404';
// import App from './demo_page/index';
import Home from './home';
import BlogPublish from './pages/blog/blog-publish';
import BlogDetails from './pages/blog/blog-details';
import BlogList from './pages/blog/blog-list';
import BlogListAdmin from './pages/blog/blog-list-admin';
import BlogLeftSidebar from './pages/blog/blog-leftsidebar';
import BlogRightSidebar from './pages/blog/blog-rightsidebar';
import BlogLeftside from './pages/blog/blog-leftside';
import BlogRightside from './pages/blog/blog-rightside';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import ForgetPassword from './pages/forget-pwd';
import ResetPassword from './pages/reset-pwd';
import SetPassword from './pages/set-password';
import ThankYou from './pages/thank-you';
import Review from './pages/review';
import PageNotFound from './pages/404';
import Faq from './pages/faq';
import Request from './pages/request';
import Download from './pages/download';
import ComingSoon from './pages/coming-soon';
import Dashboard from './pages/dashboard/dashboard';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import store from './services/store';
import { Provider } from 'react-redux';
import AcceptInvitation from './pages/accept-invitation';
const hist = createBrowserHistory();

class Root extends React.Component {
	render() {
		return (
			<Router history={hist}>
				<Switch>
					<Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
					<Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />
					<Route path={`${process.env.PUBLIC_URL}/blog-left-sidebar`} component={BlogLeftSidebar} />
					<Route path={`${process.env.PUBLIC_URL}/blog-right-sidebar`} component={BlogRightSidebar} />
					<Route path={`${process.env.PUBLIC_URL}/blog-leftside`} component={BlogLeftside} />
					<Route path={`${process.env.PUBLIC_URL}/blog-rightside`} component={BlogRightside} />
					<Route path={`${process.env.PUBLIC_URL}/blog-list`} component={BlogList} />
					<Route path={`${process.env.PUBLIC_URL}/blog-list-admin`} component={BlogListAdmin} />
					<Route exact path={`${process.env.PUBLIC_URL}/blog-publish`} component={BlogPublish} />
					<Route path={`${process.env.PUBLIC_URL}/blog-details/:blogId`} component={BlogDetails} />
					<Route path={`${process.env.PUBLIC_URL}/sign-in`} component={SignIn} />
					<Route path={`${process.env.PUBLIC_URL}/sign-up`} component={SignUp} />
					<Route path={`${process.env.PUBLIC_URL}/forget-password`} component={ForgetPassword} />
					<Route path={`${process.env.PUBLIC_URL}/reset-password/:token`} component={ResetPassword} />
					<Route path={`${process.env.PUBLIC_URL}/thank-you`} component={ThankYou} />
					<Route path={`${process.env.PUBLIC_URL}/review`} component={Review} />
					<Route path={`${process.env.PUBLIC_URL}/404`} component={PageNotFound} />
					<Route path={`${process.env.PUBLIC_URL}/faq`} component={Faq} />
					<Route path={`${process.env.PUBLIC_URL}/request`} component={Request} />
					<Route path={`${process.env.PUBLIC_URL}/download`} component={Download} />
					<Route path={`${process.env.PUBLIC_URL}/coming-soon`} component={ComingSoon} />
					<Route path={`${process.env.PUBLIC_URL}/set-password`} component={SetPassword} />
					<Route path={`${process.env.PUBLIC_URL}/accept-invitation`} component={AcceptInvitation} />
					{/*<Route path={`${process.env.PUBLIC_URL}/:team`} component={Dashboard} />*/}
					<Route path={`${process.env.PUBLIC_URL}/team`} component={Dashboard} />
					<Route component={PageNotFound} />
				</Switch>
			</Router>
		);
	}
}

ReactDOM.render(<Provider store={store}>
	<Root />
</Provider>, document.getElementById('root'));

registerServiceWorker();
