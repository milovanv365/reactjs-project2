import React, { Component } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
// import TeamNavSingleItem from './TeamNavSingleItem';
import { Avatar } from '../../../../vibe';
import team_avatar from '../team-icon.png'
import { Tooltip } from '@material-ui/core';


export default class NavDropdownItem extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);

    this.state = {
      open: false,
      submenuOpen: false,
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  toggle = e => {
    if (this.state.open === true) this.setState({ submenuOpen: false });
    // console.log("I am in first now");
    this.setState(prevState => ({ open: !prevState.open }));
    e.preventDefault();
    e.stopPropagation();
  };

  toggle1 = e => {
    console.log("I am in second now", this.state.submenuOpen);
    this.setState(prevState => ({ submenuOpen: !prevState.submenuOpen }));
  };

  invite_people = () => {
    // console.log(this.props);
    this.props.history.push(`/${localStorage.getItem('teamname')}/invite-people`);
    this.setState(prevState => ({ open: !prevState.open }));
  }

  team_roles = () => {
    this.props.history.push(`/${localStorage.getItem('teamname')}/team_roles`);
    this.setState(prevState => ({ open: !prevState.open }));
  }

  switch_team = (team) => {
    localStorage.setItem('teamname', team);
    // this.props.history.push(`/${localStorage.getItem('teamname')}`);
    window.location.href = `/${localStorage.getItem('teamname')}`;
    this.setState(prevState => ({ open: !prevState.open }));
  }

  onMouseEnter() {
    console.log("hover!!!")
  }
  render() {

    const { item } = this.props;
    const isExpanded = this.state.open ? 'open' : '';
    const ExpandIcon = this.state.open
      ? Feather.ChevronDown
      : Feather.ChevronRight;

    return (
      <li className={`nav-item has-submenu ${isExpanded}`}>
        <a href="#!" role="button" onClick={this.toggle} className="team_title">
          {/* <img className="team_avatar" src={process.env.PUBLIC_URL + '/assets/images/' + item.avatar} alt="" /> */}
          {
            this.props.isSidebarCollapsed ? (window.screen.width > 992 ? <Tooltip title={item.name}><img style={{ width: "40px", height: '40px' }} src={team_avatar} /></Tooltip> : <img style={{ width: "40px", height: '40px' }} src={team_avatar} />)
            : <img style={{ width: "40px", height: '40px' }} src={team_avatar} />
          }
          <span className="nav-item-label">{item.name}</span>{' '}
          {item.badge && (
            <NavBadge color={item.badge.variant} text={item.badge.text} />
          )}
          <ExpandIcon className="menu-expand-icon" />
        </a>
        {/* {(this.state.open || this.props.isSidebarCollapsed) && (
          <ul className="nav-submenu">
            {item.children.map((item1, index) => {
              return  <TeamNavSingleItem item={{...item1, team:team}} key={index} />
            })}
          </ul>
        )} */}
        {this.state.open && (
          <div className="team_menu_dropdown">
            <ul>
              <li onClick={this.invite_people}>Invite People</li>
              <li onClick={this.team_roles}>Team & Roles</li>
              <li
                // onClick={(e) => { this.toggle1(); e.preventDefault(); e.stopPropagation(); }} 
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}>
                Switch Team<Feather.ChevronRight className="submenu-expand-icon" />
              </li>
            </ul>
          </div>
        )}
        {/* {this.state.submenuOpen && ( */}
        {this.state.isHovering && (
          <div className="switch_team_dropdown" onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}>
            <ul>
              {JSON.parse(localStorage.getItem('teams')) && JSON.parse(localStorage.getItem('teams')).map((team, index) => {
                return <li onClick={(e) => { this.switch_team(team); e.preventDefault(); e.stopPropagation(); }} key={index}>
                  {/* <Avatar size="medium" image={team_avatar} /> */}
                  <img src={team_avatar} />
                  {team}
                </li>;
              })}
            </ul>
          </div>
        )}
      </li>
    );
  }
}
