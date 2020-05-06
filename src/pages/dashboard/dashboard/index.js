import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { Header, SidebarNav, PageContent, Avatar, PageAlert, Page } from '../vibe';
import Logo from '../../../../public/assets/images/logo.png';
import avatar1 from '../../../../public/assets/images/avatar.jpg';
import nav from '../_nav';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import Page404 from "../../404";
import '../vibe/scss/styles.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../services/action';
import { Popover } from '@material-ui/core';
import axios from "axios";


const MOBILE_SIZE = 992;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            isMobile: window.innerWidth <= MOBILE_SIZE,
            showChat1: true,
            showguid: false,
            popOpen: false,
            anchorRef: null,
            count: 0,
            rotatefunction: -1,
            // notifications: [
            //     { 'avatar': "MS", 'message': 'Michael S. unverified translation', 'time': 'about 1 hours ago', 'company': 'Your company' },
            //     { 'avatar': "BM", 'message': 'Bianca M. created new.test.key in Your Android App', 'time': '1 day ago', 'company': 'Your company' },
            //     { 'avatar': "MB", 'message': 'Manuel B. has mentioned you in a comment on account logo', 'time': '3 days ago', 'company': 'Your company' },
            //     { 'avatar': "TL", 'message': 'Tim L. created 2 keys in Your new iOS App', 'time': '1 month ago', 'company': 'Your company' }
            // ]
            notifications: [],
            avatar: ''
        };
        this.openPopover = this.openPopover.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.startrotate = this.startrotate.bind(this)
    }

    handleResize = () => {
        if (window.innerWidth <= MOBILE_SIZE) {
            this.setState({ sidebarCollapsed: false, isMobile: true });
        } else {
            this.setState({ isMobile: false });
        }
    };

    componentDidUpdate(prev) {
        if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
            this.toggleSideCollapse();
        }
    }

    loadNotifications = () => {
        var token = localStorage.getItem('token');
        let correctbasename = '';
        var url = `http://localhost:8000/users/notifications/${localStorage.getItem('teamname')}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        axios.get(url, { headers: headers }).then((response) => {
            if (response.data.notification.length !== 0)
                this.setState({ notifications: response.data.notifications });
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
    }

    componentDidMount() {
        this.setState({ avatar: "http://localhost:8000/public" + JSON.parse(localStorage.getItem('user')).avatar })
        if (!localStorage.getItem('token')) this.props.history.push('/sign-in');
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('keydown', handleKeyAccessibility);
        document.addEventListener('click', handleClickAccessibility);
        this.loadNotifications();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    toggleSideCollapse = () => {
        this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    };

    closeChat = () => {
        this.setState({ showChat1: false });
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('teamname');
        this.props.history.push('/sign-in');
    }

    click_guide = () => {
        this.setState(prevState => ({ showguid: !prevState.showguid }));
    }

    profile = () => {
        this.props.history.push(`/${localStorage.getItem('teamname')}/profile`);
    }

    async openPopover(event) {
        await this.setState({
            popOpen: true,
            anchorRef: event.currentTarget
        })
    }

    async handleClose() {
        await this.setState({
            anchorRef: null,
            popOpen: false
        })
    }

    notifications = () => {
        if (this.state.notifications.length !== 0) {
            return (
                this.state.notifications.map((notification, i) =>
                    <a href={notification.link} style={{ textDecoration: 'none', borderBottom: "0.5px #f8f9fa solid" }} key={i}>
                        {/* <Avatar>{notification.avatar}</Avatar> */}

                        {/* {JSON.parse(localStorage.getItem('user')).avatar.length > 0 ?
                            <img className="profile_page_avatar" id="profile_page_avatar" src={this.state.avatar} alt="profile_avatar"></img>
                            : */}
                        <div style={{ padding: "5px" }} className="avatar_area profile-block">
                            <Avatar size="medium" color="blue" initials={notification.avatar} />
                        </div>
                        // }
                        <div style={{ padding: "5px" }} >
                            <p style={{ fontSize: "12px" }}>{notification.message}</p>
                            <div style={{ display: 'inline-block' }}>
                                <p style={{ float: "left", marginBottom: '0px', color: "#6c757d", fontSize: '12px', fontWeight: '700' }}>{notification.time}</p>
                                {/* <p style={{ float: "left" }}> . </p> */}
                                <p style={{ float: "left", marginLeft: "10px", marginBottom: '0px', color: "#007bff", fontSize: '12px' }}>{notification.company}</p>
                            </div>
                        </div>
                    </a>
                )
            )
        } else {
            return (
                <div className="emptyNotify">
                    <p>You're all caught up for now</p>
                </div>
            )
        }
    }

    runrotate = async () => {
        if (this.state.count === 360) {
            await this.setState({ count: 0 });
            await clearInterval(this.state.rotatefunction);
        }
        else await this.setState({ count: this.state.count + 4 });
    }

    async startrotate() {
        if (this.state.count === 0) await this.setState({ rotatefunction: setInterval(this.runrotate, 1) });
    }

    HeaderNav = () => {
        let user_avatar = null;
        if (localStorage.getItem('user')) {
            let user_data = JSON.parse(localStorage.getItem('user'));
            let profile_avatar = "";
            if (!user_data.avatar) {
                if (user_data.firstname && user_data.lastname) profile_avatar = user_data.firstname[0].toUpperCase() + user_data.lastname[0].toUpperCase();
                else profile_avatar = user_data.email.slice(0, 2).toUpperCase();
            }
            else {
                // profile_avatar = process.env.REACT_APP_API_HOST + user_data.avatar;
                profile_avatar = "http://localhost:8000/public" + user_data.avatar;
            }

            user_avatar = (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {user_data.avatar ? <Avatar size="medium" image={profile_avatar} /> : <Avatar size="medium" color="blue" initials={profile_avatar} />}
                    <div className="prfile-body">
                        <h5 className="profile-name">{user_data ? user_data.firstname : ''} <span>{user_data ? user_data.lastname : ''}</span></h5>
                        <span>{user_data ? user_data.email : ''}</span>
                    </div>
                </div>
            );
        }
        return (
            <React.Fragment>
                {/* <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="alert-bell">
                        <i className="fa fa-bell-o fa-1x"></i>
                        <span className="badge badge-success">6</span>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>Project</DropdownItem>
                        <DropdownItem>User</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            Message <Badge color="primary">10</Badge>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown> */}

                <Button onClick={this.openPopover}>
                    <i className="fa fa-bell-o fa-1x"></i>
                    <span className="badge badge-success">4</span>
                </Button>

                <Popover open={this.state.popOpen} anchorEl={this.state.anchorRef} onClose={this.handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <div className="notifications">
                        {this.notifications()}
                    </div>
                </Popover>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="profile-block">
                        {user_avatar}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.profile}>My Profile</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </React.Fragment>
        );
    }

    renderPagecontent() {
        if (this.props.team_data === "") return <Page404 />
        return <PageContent>
            <Switch>
                {routes.map(({ path, component: Component }, key) => {
                    return <Route path={`/${this.props.match.params.team}${path}`} render={(props) => <Component {...props} />} key={key} />
                })}
            </Switch>
        </PageContent>
    }


    render() {
        const { sidebarCollapsed } = this.state;
        const sidebarCollapsedClass = (sidebarCollapsed ? 'side-menu-collapsed' : '') + (window.screen.width <= 992 ? ' res-menu-collapsed' : '');
        const { team } = this.props.match.params;
        return (
            <ContextProviders>
                <div className={`app ${sidebarCollapsedClass}`}>
                    <PageAlert />
                    <div className="app-body">
                        <SidebarNav count={this.state.count} nav={nav} logo={Logo} logoText="" isSidebarCollapsed={sidebarCollapsed} toggleSidebar={this.toggleSideCollapse} {...this.props} startrotate={this.startrotate} />
                        <Page>
                            <Header toggleSidebar={this.toggleSideCollapse} isSidebarCollapsed={sidebarCollapsed} routes={routes} {...this.props}>
                                {this.HeaderNav()}
                            </Header>
                            {this.renderPagecontent()}
                        </Page>
                    </div>

                    <i className="fa fa-question-circle fa-4x text-danger" onClick={this.click_guide}></i>
                    {this.state.showguid && (
                        <div className="site_guide">
                            <ul>
                                <li>User Guide</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    )}

                </div>
            </ContextProviders>
        );
    }
}

const mapStateToProps = ({ team_data }) => ({
    team_data
});

const mapDispatchToProps = (dispatch) => ({
    setTeamData: bindActionCreators(setTeamData, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);