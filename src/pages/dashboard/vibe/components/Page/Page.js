import React, { Component } from 'react';
import PageAlertContext from '../PageAlert/PageAlertContext';

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <PageAlertContext.Consumer>
        {context => {
          const hasPageAlertClass = context.alert ? 'has-alert' : '';
          return (
            <div id="page-content" className={`${hasPageAlertClass}`}>
              {this.props.children}
            </div>
          );
        }}
      </PageAlertContext.Consumer>
    )
  }
}

export default Page;
