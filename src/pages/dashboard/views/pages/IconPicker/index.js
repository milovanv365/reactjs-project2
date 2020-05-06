import React, { Component } from 'react';
import { SketchPicker } from 'react-color'
import { Button, Tabs, Tab, AppBar, Typography, Box } from '@material-ui/core';
import "./index.scss"

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

class IconPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '#000000',
            showtype: 0,
            tabvalue: 0
        }
        this.onChange = this.onChange.bind(this)
        this.onColor = this.onColor.bind(this)
        this.onIcon = this.onIcon.bind(this)
        this.tabChange = this.tabChange.bind(this)
    }

    async onChange(color) {
        await this.setState({ color: color.hex })
    }

    async onColor() {
        await this.setState({ showtype: 1 })
    }

    async onIcon() {
        await this.setState({ showtype: 2 })
    }

    async onBack() {
        await this.setState({ showtype: 0 })
    }

    async tabChange(event, newValue) {
        await this.setState({ tabvalue: newValue })
    }

    showrender() {
        var record = []
        if (this.state.showtype === 0) {
            record.push(
                <div className="typegroup" key={0}>
                    <div className="picktype">
                        <h4 style={{ marginBottom: '0px', color: 'black', float: 'left', marginTop: '3px' }}>Icon</h4>
                        <Button variant="contained" onClick={this.onIcon} style={{ float: 'right' }}>
                            <img src={require(`./svg/${this.props.icongroup}/${this.props.iconIndex}.svg`)} style={{ width: '25px', height: '25px', float: 'right' }} />
                        </Button>
                    </div>
                    <br /><br />
                    <div className="picktype">
                        <h4 style={{ color: 'black', float: 'left', marginTop: '3px' }}>Color</h4>
                        <Button variant="contained" onClick={this.onColor} style={{ float: 'right' }}>
                            <div style={{ width: '25px', height: '25px', float: 'right', backgroundColor: this.props.iconColor }} />
                        </Button>
                    </div>
                </div>
            )
        } else if (this.state.showtype === 1) {
            record.push(<SketchPicker
                color={this.props.iconColor}
                onChange={this.props.onChangeColor}
                onChangeComplete={this.props.onChangeColor}
                key={0} />)
        } else {
            var Business_icons = [], business_count = 73, index = 1, row = []
            while (index <= business_count) {
                row = []
                if (index + 8 <= business_count) {
                    for (let j = 0; j < 8; j++) {
                        const num = index
                        row.push(<Button className="iconbtn" key={index} onClick={() => { this.props.iconSelect({ group: "business", index: num })}}>
                            <img src={require(`./svg/business/${index}.svg`)} style={{ width: '24px', height: '24px' }} />
                        </Button>)
                        index++
                    }
                    Business_icons.push(<div key={index} className="iconrow">{row}</div>)
                } else {
                    const restcount = business_count - index + 1
                    for (let j = 0; j < restcount; j++) {
                        const num = index
                        row.push(<Button className="iconbtn" key={num} onClick={() => { this.props.iconSelect({ group: "business", index: num })}}>
                            <img src={require(`./svg/business/${num}.svg`)} style={{ width: '24px', height: '24px' }} />
                        </Button>)
                        index++
                    }
                    Business_icons.push(<div key={index} className="iconrow">{row}</div>)
                    break;
                }
            }

            var House_icons = [], house_count = 50
            index = 1
            while (index <= house_count) {
                row = []
                if (index + 8 <= house_count) {
                    for (let j = 0; j < 8; j++) {
                        const num = index
                        row.push(<Button className="iconbtn" key={index} onClick={() => { this.props.iconSelect({ group: "house", index: num })}}>
                            <img src={require(`./svg/house/${index}.svg`)} style={{ width: '24px', height: '24px' }} />
                        </Button>)
                        index++
                    }
                    House_icons.push(<div key={index} className="iconrow">{row}</div>)
                } else {
                    const restcount = house_count - index + 1
                    for (let j = 0; j < restcount; j++) {
                        const num = index
                        row.push(<Button className="iconbtn" key={num} onClick={() => { this.props.iconSelect({ group: "house", index: num })}}>
                            <img src={require(`./svg/house/${num}.svg`)} style={{ width: '24px', height: '24px' }} />
                        </Button>)
                        index++
                    }
                    House_icons.push(<div key={index} className="iconrow">{row}</div>)
                    break;
                }
            }
            record.push(
                <AppBar position="static" color="default" key={1}>
                    <Tabs value={this.state.tabvalue} onChange={this.tabChange} indicatorColor="primary" textColor="primary" variant="scrollable">
                        <Tab icon={<img src={require('./svg/business/14.svg')} style={{ width: '24px', height: '24px' }} />} {...a11yProps(0)} />
                        <Tab icon={<img src={require('./svg/house/25.svg')} style={{ width: '24px', height: '24px' }} />} {...a11yProps(1)} />
                    </Tabs>

                </AppBar>
            )
            record.push(<TabPanel value={this.state.tabvalue} index={0} key={2}>{Business_icons}</TabPanel>)
            record.push(<TabPanel value={this.state.tabvalue} index={1} key={3}>{House_icons}</TabPanel>)
        }
        return record
    }

    render() {
        return (
            <div className="iconpicker">
                {this.showrender()}
            </div>
        )
    }
}

export default IconPicker;