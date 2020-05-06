import React, { Component } from 'react';
import * as Feather from 'react-feather';
import { Badge } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import tableimg from '../../../../../../../public/assets/images/table-gray.png';

export default class NavDropdownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      submenuOpen: false,
      open_status: Array(10).fill(false),
      d_delete: false,
      baseid: '',
    };

  }

  componentDidMount() {
    this.getBaseStatus();
  }

  getBaseStatus = async () => {
    if (!JSON.parse(localStorage.getItem(localStorage.getItem('teamname')))) this.setState({ open_status: Array(10).fill(false) })
    else if (localStorage.getItem('teamname') === JSON.parse(localStorage.getItem(localStorage.getItem('teamname'))).team) {
      await this.setState({ open_status: JSON.parse(localStorage.getItem(localStorage.getItem('teamname'))).data })
    }
    else {
      await this.setState({ open_status: Array(10).fill(false) })
    }
  }

  newbase = () => {
    // this.props.history.push(`/${localStorage.getItem('teamname')}/newbase`);
    this.props.startrotate();
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var token = localStorage.getItem('token');
    var url = `http://localhost:8000/team/newbase/${teamname}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };

    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        let newbasename = response.data.base.basename_encoded;

        this.props.setTeamData(response.data.team);
        this.props.history.push(`/${teamname}/${newbasename}/properties`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
        console.log(error);
        this.props.history.push('/404')
      });
  }

  newtable = async (baseid, index) => {
    this.props.startrotate();
    const newstatus = this.state.open_status.slice()
    newstatus[index] = true
    await this.setState({ open_status: newstatus })

    var base_status = {};
    base_status = { 'data': this.state.open_status, 'team': localStorage.getItem('teamname') }
    localStorage.setItem(localStorage.getItem('teamname'), JSON.stringify(base_status))

    console.log("new table click: ", localStorage.getItem(localStorage.getItem('teamname')))

    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var token = localStorage.getItem('token');
    var url = `http://localhost:8000/team/newtable/${teamname}/${baseid}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        //let correct_tablename = response.data.newtable.tablename.replace(/\s/g, '-').toLowerCase();
        //let correct_basename = baseid.replace(/\s/g, '-').toLowerCase();
        this.props.setTeamData(response.data.team);

        let base = null;
        for (base of response.data.team.bases) {
          if (base.id === baseid) {
            break;
          }
        }

        // get redirection link from team_data
        let table_name = response.data.table.tablename_encoded;
        let table_id = response.data.table.tableid;

        this.props.history.push(`/${teamname}/${base.basename_encoded}/${table_name}-${table_id}/properties`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }

  delete_base = (baseid) => {
    console.log("baseid:", baseid)
    var token = localStorage.getItem('token');
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var url = `http://localhost:8000/team/deletebase/${teamname}/${baseid}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        this.props.setTeamData(response.data);
        this.props.history.push(`/${teamname}`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }

  deletetable = (baseid, tableid) => {
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var token = localStorage.getItem('token');
    var url = `http://localhost:8000/team/deletetable/${teamname}/${baseid}/${tableid}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        this.props.setTeamData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }

  base_properties = (basename) => {
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var replacedbasename = basename.replace(/\s/g, '-').toLowerCase();
    this.props.history.push(`/${teamname}/${replacedbasename}/properties`);
  }

  baseclick = async (basename, index) => {
    // let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    // this.props.history.push(`/${teamname}/${basename}`);
    // this.setState(prevState => ({ open: !prevState.open }));
    const newstatus = this.state.open_status.slice()
    newstatus[index] = !newstatus[index]
    await this.setState({ open_status: newstatus })

    var base_status = {};
    base_status = { 'data': this.state.open_status, 'team': localStorage.getItem('teamname') }
    localStorage.setItem(localStorage.getItem('teamname'), JSON.stringify(base_status))
    console.log("baseclick: ", localStorage.getItem(localStorage.getItem('teamname')))
  }

  tableclick = (tablename, tableindex, basename) => {
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    let correct_tablename = tablename.replace(/\s/g, '-').toLowerCase();
    let correct_basename = basename.replace(/\s/g, '-').toLowerCase();
    this.props.history.push(`/${teamname}/${correct_basename}/${correct_tablename}-${tableindex}`);
  }

  table_properties = (tablename, tableindex, basename) => {
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    let correct_tablename = tablename.replace(/\s/g, '-').toLowerCase();
    let correct_basename = basename.replace(/\s/g, '-').toLowerCase();
    this.props.history.push(`/${teamname}/${correct_basename}/${correct_tablename}-${tableindex}/properties`);
  }

  deleteBaseCheck = (e, baseid, basename) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ d_delete: true, to_be_deleted: baseid, d_type: "Base", d_content: basename })
  }

  deleteBaseTable = () => {
    if (this.state.d_type === "Base") this.delete_base(this.state.to_be_deleted)
    else this.deletetable(this.state.baseid, this.state.to_be_deleted)
    this.setState({ d_delete: false })
  }

  deleteTableCheck = (e, baseid, tableid, tablename) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ d_delete: true, to_be_deleted: tableid, baseid: baseid, d_type: "Table", d_tablename: tablename, d_content: tablename })
  }

  handleClose = () => {
    this.setState({ d_delete: false })
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    const { item } = this.props;

    const Icon = item.icon ? Feather[item.icon] : null;

    const isExpanded = this.state.open ? 'open' : '';

    const basenav = () => {
      return item.children && item.children.map((item1, index) => {
        return (
          <div className={`nav-item has-submenu ${isExpanded}`} key={index}>
            <Dialog open={this.state.d_delete} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">Delete {this.state.d_type} {this.state.d_content}?</DialogTitle>
              <DialogActions>
                <Button onClick={this.deleteBaseTable} color="primary" variant="contained">Yes</Button>
                <Button onClick={this.handleClose} color="secondary" variant="contained">No</Button>
              </DialogActions>
            </Dialog>
            <a onClick={(e) => { this.baseclick(item1.basename, index); e.preventDefault(); e.stopPropagation(); }} role="button" key={index}>
              <Tooltip title={item1.basename}>
                <span style={{ backgroundColor: item1.basecolor, width: '24px', height: '24px', textAlign: 'center', borderRadius: '5px' }}>
                  <img className="mySVG" src={require(`../../../../views/pages/IconPicker/svg/${item1.baseIconGroup}(white)/${item1.baseIconIndex}.svg`)} width="16" height="16" type="image/svg+xml" />
                </span>
              </Tooltip>
              <span className="nav-item-label ml-3">{item1.basename}</span>
            </a>
            <UncontrolledDropdown className="base-dropdown-div">
              <DropdownToggle className="table-dropdown-toggle">
                ...
              </DropdownToggle>
              <DropdownMenu right className="base-dropped-toggle">
                <DropdownItem onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.newtable(item1.id, index);
                }}>
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>New Table
                    </DropdownItem>
                <DropdownItem onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.base_properties(item1.basename);
                }}>Properties</DropdownItem>
                <DropdownItem onClick={(e) => this.deleteBaseCheck(e, item1.id, item1.basename)}>Delete Base</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            {this.state.open_status[index] && (<div>
              {item1.tables.map((table, index) => {
                return (
                  <div className="nav-item has-submenu table-menu" key={index}>
                    <a onClick={(e) => {
                      this.tableclick(table.tablename, table.tableid, item1.basename);
                      e.preventDefault();
                      e.stopPropagation();
                    }} role="button" key={index}>
                      <Tooltip title={table.tablename}><img src={tableimg} className="ml-4" /></Tooltip>
                      <span className="nav-item-label ml-1">{table.tablename}</span>
                    </a>
                    <UncontrolledDropdown className="table-dropdown-div">
                      <DropdownToggle className="table-dropdown-toggle">
                        ...
                    </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={(e) => {
                          this.table_properties(table.tablename, table.tableid, item1.basename);
                          e.preventDefault();
                          e.stopPropagation();
                        }}>Properties</DropdownItem>
                        <DropdownItem onClick={(e) => { this.deleteTableCheck(e, item1.id, table.id, table.tablename) }}>Delete Table</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                )
              })}
            </div>
            )}
          </div>
        )
      })
    }

    var newbase;
    if (!this.props.isSidebarCollapsed) {
      newbase = <a role="button" className="s_newbase">
        {item.icon && Icon && <Icon className="side-nav-icon" />}
        <span className="nav-item-label" style={{ float: 'left' }}>{item.name}</span>{' '}
        {item.badge && (<span className="new-base-badge" onClick={(e) => { this.newbase(); e.preventDefault(); e.stopPropagation(); }} >
          <Badge color={item.badge.variant}><i className="fa fa-plus" aria-hidden="true"></i>{item.badge.text}</Badge>
        </span>
        )}
      </a>
    } else {
      newbase = window.screen.width >= 992 ? <Tooltip title="New Base"><a role="button" className="s_newbase" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => { this.newbase(); e.preventDefault(); e.stopPropagation(); }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '5px', fontSize: '16px', backgroundColor: '#27826c' }}>+</div>
      </a></Tooltip> : <a role="button" className="s_newbase">
          {item.icon && Icon && <Icon className="side-nav-icon" />}
          <span className="nav-item-label" style={{ float: 'left' }}>{item.name}</span>{' '}
          {item.badge && (<span className="new-base-badge" onClick={(e) => { this.newbase(); e.preventDefault(); e.stopPropagation(); }} >
            <Badge color={item.badge.variant}><i className="fa fa-plus" aria-hidden="true"></i>{item.badge.text}</Badge>
          </span>
          )}
        </a>
    }
    return (
      <li className="nav-item has-submenu mainsidebar">
        {newbase}
        {basenav()}
      </li>
    );
  }
}
