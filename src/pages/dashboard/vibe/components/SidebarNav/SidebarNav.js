import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavOverlay from './components/NavOverlay';
import NavDropdownItem from './components/NavDropdownItem';
import TeamNav from './components/TeamNav';
import PageAlertContext from '../PageAlert/PageAlertContext';
import axios from "axios";
// import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../../../services/action';
import sLogo from '../../../../../../public/assets/images/slogo.png';
import Tooltip from '@material-ui/core/Tooltip';
import logo1 from '../../../../../../public/assets/images/slogo.png';
import logo2 from '../../../../../../public/assets/images/logo-2.png';

class SidebarNav extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef()
    this.state = {
      team_data: {},
    };
  }

  componentDidMount() {
    this.getteamdata();
    localStorage.setItem('rotate', 0);
  }

  getteamdata = () => {
    var token = localStorage.getItem('token');
    var url = "http://localhost:8000/team/getteam/" + this.props.match.params.team;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        this.props.setTeamData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }

  render() {
    const team = this.props.team_data;

    const navTeam = (teamnav) => {
      return <TeamNav item={teamnav} {...this.props} isSidebarCollapsed={this.props.isSidebarCollapsed} />;
    }
    const basenav = {
      name: "Bases",
      url: '/widgets',
      badge: {
        text: 'New Base',
      },
      children: team.bases
    }

    const navBases = (basenav) => {
      return <NavDropdownItem item={{ ...basenav, team: this.props.match.params.team }} {...this.props} isSidebarCollapsed={this.props.isSidebarCollapsed} bases={this.props.team_data.bases} />;
    }

    const NavBrand = ({ logo, logoText }) => {
      return (
        <div className="site-logo-bar">
          {!this.props.isSidebarCollapsed &&
            <NavLink to="/" className="navbar-brand">
              {logo && <img src={logo1} alt="Teamistry" style={{ transform: `rotate(${this.props.count}deg)`, width: '30px'}} />}
              {logo && <img src={logo2} alt="Teamistry" style={{ width: '120px' }} />}
              {logoText && <span className="logo-text">{logoText}</span>}
            </NavLink>}
          {this.props.isSidebarCollapsed && (window.screen.width > 992 ? <NavLink to="/" className="navbar-brand" style={{ padding: '0px 1px' }}>
            <div style={{ backgroundColor: 'white' }}><img src={sLogo} style={{ transform: `rotate(${this.props.count}deg)`, width: '48px', height: '48px', maxWidth: '48px', maxHeight: '48px' }} /></div>
          </NavLink> : <NavLink to="/" className="navbar-brand">
              {logo && <img src={logo1} alt="" style={{ transform: `rotate(${this.props.count}deg)`, width: '30px'}} />}
              {logo && <img src={logo2} alt="" style={{ width: '120px' }} />}
              {logoText && <span className="logo-text">{logoText}</span>}
            </NavLink>)}
        </div>
      );
    };

    const teamnav = {
      name: team.teamname,
      avatar: team.teamavatar,
      children: [
        {
          name: 'Invite People',
          url: '/invite-people',
        },
        {
          name: 'Settings',
          url: '/settings',
        },
        {
          name: 'Switch Team',
          children: JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).teams
        }
      ]
    };

    return (
      <PageAlertContext.Consumer>
        {consumer => {
          const hasPageAlertClass = consumer.alert ? 'has-alert' : '';
          return (
            <div>
              <div className={`app-sidebar ${hasPageAlertClass}`}>
                <NavBrand logo={this.props.logo} logoText={this.props.logoText} />
                <nav>
                  <ul id="main-menu">
                    {navTeam(teamnav)}
                    {navBases(basenav)}
                  </ul>
                </nav>
              </div>
              {this.props.isSidebarCollapsed && <NavOverlay onClick={this.props.toggleSidebar} />}
            </div>
          );
        }}
      </PageAlertContext.Consumer>
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
)(SidebarNav);