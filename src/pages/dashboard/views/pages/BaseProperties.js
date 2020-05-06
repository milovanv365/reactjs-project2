import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Row, Card, CardBody, CustomInput } from 'reactstrap';
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, responsiveFontSizes, Popover } from '@material-ui/core';
import { setTeamData } from '../../../../services/action';
import IconPicker from './IconPicker'

class BaseProperties extends Component {
    constructor() {
        super();
        this.state = {
            baseid: '',
            basename: '',
            basename_encoded: '',
            editbasename: false,
            description: '',
            editdescription: false,
            base_url: '',
            error_opacity: 0,
            iconselect: false,
            anchorRef: null,
            icongroup: "business",
            iconIndex: 3,
            iconColor: "#2A5D7F"
        }
        this.onChangeIcon = this.onChangeIcon.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.iconSelect = this.iconSelect.bind(this)
        this.onChangeColor = this.onChangeColor.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.getbasedata();
    }

    handleClickOutside = async (event) => {
        if (this.state.editdescription && !this.basedescriptionRef.contains(event.target))
            this.setState({ editdescription: false })
        else if (this.state.editbasename && !this.basenameRef.contains(event.target))
            this.setState({ editbasename: false })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.basename !== prevProps.match.params.basename) {
            this.getbasedata();
        }
    }

    async onChangeIcon(event) {
        await this.setState({
            iconselect: true,
            anchorRef: event.currentTarget
        })
    }

    async handleClose() {
        await this.setState({
            anchorRef: null,
            iconselect: false
        })
    }

    getbasedata = () => {
        var token = localStorage.getItem('token');
        /*let correctbasename = '';
        let basename = this.props.match.params.basename.split("-");
        if (basename.length > 1) {
            for (var i = 0; i < basename.length; i++) {
                if (i === 0) correctbasename += basename[0] + '%C2%A0';
                else if (i === basename.length - 1) correctbasename += basename[i];
                else correctbasename = correctbasename + basename[i] + '%20';
            }
        }
        else correctbasename = basename[0];*/

        var url = `http://localhost:8000/team/getbase/${localStorage.getItem('teamname')}/${this.props.match.params.basename}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        axios.get(url, { headers: headers }).then((response) => {


            // this.setState({ team_data: response.data });
            this.setState({
                baseid: response.data.baseid,
                basename: response.data.basename,
                basename_encoded: response.data.basename_encoded,
                description: response.data.basedescription,
                base_url: response.data.basename,
                icongroup: response.data.baseIconGroup,
                iconIndex: response.data.baseIconIndex,
                iconColor: response.data.basecolor
            });
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
    }

    basename_change = (e) => {
        this.setState({ basename: e.target.value });
    }

    description_change = (e) => {
        this.setState({ description: e.target.value });
    }

    /*send_basename = () => {
        this.setState({ editbasename: false });
        if (this.state.base_url.replace(/\s/g, '-').toLowerCase() !== this.state.basename.replace(/\s/g, '-').toLowerCase()) {
            var token = localStorage.getItem('token');
            var url = `http://localhost:8000/team/setbasename/${localStorage.getItem('teamname')}/${this.state.baseid}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            };
            var data = {
                basename: this.state.basename,
                basedescription: this.state.description,
                basecolor: this.state.iconColor,
                baseIconIndex: this.state.iconIndex,
                baseIconGroup: this.state.icongroup
            }
            axios.post(url, data, { headers: headers }).then((response) => {
                this.props.setTeamData(response.data.team);
                this.setState({ base_url: response.data.base.basename });
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                    this.setState({ basename: this.state.base_url });
                    this.setState({ error_opacity: 1 }, () => setTimeout(() => this.setState({ error_opacity: 0 }), 2000));
                }
                console.log(error);
            });
        }

    }*/

    send_description = () => {
        this.setState({ editdescription: false });
        this.send_data();
    }

    send_data = () => {
        var token = localStorage.getItem('token');
        var url = `http://localhost:8000/team/setbase/${localStorage.getItem('teamname')}/${this.state.baseid}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        var data = {
            basename: this.state.basename,
            basedescription: this.state.description,
            basecolor: this.state.iconColor,
            baseIconIndex: this.state.iconIndex,
            baseIconGroup: this.state.icongroup
        }
        axios.post(url, data, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                this.props.setTeamData(response.data.team);
                this.setState({ base_url: response.data.base.basename_encoded });
                //window.history.pushState({}, this.state.basename, `/${localStorage.getItem('teamname')}/${this.state.basename_encoded}/properties`);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    async iconSelect(childdata) {
        await this.setState({ iconIndex: childdata.index, icongroup: childdata.group })

        this.send_data();
    }

    async onChangeColor(color) {
        await this.setState({ iconColor: color.hex })

        this.send_data();
    }

    render() {
        return (
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardBody>
                            <Form>
                                <div className="text-center mb-5">
                                    <h2 ref={hh => this.hh = hh}>Base Properties</h2>
                                </div>
                                <div className="alert alert-danger mr-5 ml-5 text-center fade-in" style={{ opacity: this.state.error_opacity, transition: "opacity 1s" }}>
                                    <strong>Error!</strong> Another base with this name exists.
                                </div>
                                <FormGroup row>
                                    {/* <Label for="basename" sm={12}><b>Base Name</b></Label> */}
                                    <Col sm={12} style={{ display: "inline-flex", alignItems: 'center' }}>
                                        <Button className="baseicon" variant="contained" style={{ marginRight: "15px", background: this.state.iconColor }} onClick={this.onChangeIcon}>
                                            <img className="white" style={{ width: '32px', height: '32px' }} src={require(`./IconPicker/svg/${this.state.icongroup}(white)/${this.state.iconIndex}.svg`)} /></Button>
                                        <Popover open={this.state.iconselect} anchorEl={this.state.anchorRef} onClose={this.handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                            <IconPicker iconSelect={this.iconSelect} onChangeColor={this.onChangeColor} iconColor={this.state.iconColor} icongroup={this.state.icongroup} iconIndex={this.state.iconIndex} />
                                        </Popover>
                                        <div ref={dd => this.basenameRef = dd} style={{width: '100%'}}>
                                            {this.state.editbasename ? (
                                                <Input type="text" autoFocus placeholder="New Base Name" value={this.state.basename} onChange={this.basename_change} onBlur={this.send_data} />
                                            ) : (<div className="name_div" onClick={async () => {
                                                await this.setState({ editbasename: true });
                                                if (this.state.editdescription) await this.setState({ editdescription: false });
                                            }}><span >{this.state.basename}</span></div>)}
                                        </div>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={12}><b>Description</b></Label>
                                    <Col sm={12}>
                                        <div ref={dd => this.basedescriptionRef = dd}>
                                            {this.state.editdescription ? (
                                                <Input type="textarea" autoFocus rows="5" value={this.state.description} onChange={this.description_change} onBlur={this.send_data} />
                                            ) : (<div className="description_div" onClick={async () => {
                                                await this.setState({ editdescription: true });
                                                if (this.state.editbasename) await this.setState({ editbasename: false });
                                            }}><span>{this.state.description}</span></div>)}
                                        </div>
                                    </Col>
                                    {/* <Input type="textarea" name="text" id="exampleText" rows="5" value={this.state.description} onChange={this.description_change} /> */}
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = ({ team_data }) => ({
    team_data
});

const mapDispatchToProps = (dispatch) => ({
    setTeamData: bindActionCreators(setTeamData, dispatch)
});

const ReduxNewBase = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BaseProperties);

export default ReduxNewBase;

