import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Row, Card, CardBody, CustomInput } from 'reactstrap';
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../../services/action';

class TableProperties extends Component {
    constructor() {
        super();
        this.state = {
            tableid: '',
            baseid: '',
            tablename: '',
            tablename_encoded: '',
            edittablename: false,
            description: '',
            editdescription: false,
            public_check: true,
            num_table_id: ''
        }
    }

    componentDidMount() {
        this.gettable_data();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.tablename !== prevProps.match.params.tablename) {
            this.gettable_data();
        }
    }

    gettable_data = () => {
        var token = localStorage.getItem('token');
        // console.log(this.props.match.params.tablename.split("-")[1]);

        let basename = this.props.match.params.basename;
        let tablename = this.props.match.params.tablename;

        var url = `http://localhost:8000/team/gettable/${localStorage.getItem('teamname')}/${basename}/${tablename}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        axios.get(url, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                this.setState({
                    tableid: response.data.table.id,
                    baseid: response.data.table.baseid,
                    tablename: response.data.table.tablename,
                    tablename_encoded: response.data.table.tablename_encoded,
                    description: response.data.table.tabledescription,
                    num_table_id: response.data.table.tableid
                });

                console.log(`Base ID: ${response.data.table.baseid}`);
                console.log(`Table ID: ${response.data.table.id}`);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    tablename_change = (e) => {
        this.setState({ tablename: e.target.value });
    }

    description_change = (e) => {
        this.setState({ description: e.target.value });

    }

    send_tablename = () => {
        this.setState({ edittablename: false });
        this.send_data();
    }

    description_send = () => {
        this.setState({ editdescription: false });
        this.send_data();
    }

    send_data = () => {
        var token = localStorage.getItem('token');

        var url = `http://localhost:8000/team/settable/${localStorage.getItem('teamname')}/${this.state.baseid}/${this.state.tableid}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        var data = {
            tablename: this.state.tablename,
            tabledescription: this.state.description
        }
        console.log("data", data);
        axios.post(url, data, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                //this.setState({table_url: response.data.table._id});
                this.props.setTeamData(response.data.team);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    render() {
        return (
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardBody>
                            <Form>
                                <div className="text-center mb-5">
                                    <h2>Table Properties</h2>
                                </div>
                                <FormGroup row>
                                    <Label for="tablename" sm={12}><b>Table Name</b></Label>
                                    <Col sm={12}>
                                        {this.state.edittablename ? (
                                            <Input type="text" autoFocus placeholder="New Base Name" value={this.state.tablename} onChange={this.tablename_change} onBlur={this.send_tablename} />
                                        ) : (<div className="name_div" onClick={() => { this.setState({ edittablename: true }); }}><span>{this.state.tablename}</span></div>)}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={3}><b onClick={() => { this.setState({ editdescription: true }); }}>Description</b></Label>
                                    <Col sm={12}>
                                        {this.state.editdescription ? (
                                            <Input type="textarea" autoFocus rows="5" value={this.state.description} onChange={this.description_change} onBlur={this.description_send} />
                                        ) : (<div className="description_div" onClick={() => { this.setState({ editdescription: true }); }}><span>{this.state.description}</span></div>)}
                                    </Col>

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
)(TableProperties);

export default ReduxNewBase;
