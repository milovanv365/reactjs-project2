import React, {Component} from 'react';
import axios from 'axios';

class BaseAccessLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'hide'
        }
    }

    componentDidMount() {
        this.setState({
            selectedValue: this.props.access_level
        });
    }

    handleChange = (event) => {
        this.setState({
            selectedValue: event.target.value
        });

        console.log(`Change access level for ${this.props.base_name}`);

        var token = localStorage.getItem('token');
        
        let body = {
            role: this.props.role,
            base_name: this.props.base_name,
            access_level: event.target.value
        }

        var url = `http://localhost:8000/team/changeaccesslevel/${localStorage.getItem('teamname')}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        var data = JSON.stringify(body)
        axios.post(url, data, { headers: headers }).then((response) => {
            console.log(response.data.access_levels);
            //console.log(response.data.users);

            
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
    }

    render() {
        return (
            <tr key={this.props.base_name}>
                <td>{this.props.base_name}</td>
                <td>
                    <select value={this.state.selectedValue} onChange={this.handleChange}>
                        <option value="show">Show</option>
                        <option value="hide">Hide</option>
                    </select>
                </td>
            </tr>
        )
    }
}

export default BaseAccessLevel;