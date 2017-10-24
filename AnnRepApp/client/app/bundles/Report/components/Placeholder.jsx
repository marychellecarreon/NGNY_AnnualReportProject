import PropTypes from 'prop-types';
import React from 'react';
import Menu from '../components/Menu';
import Content from '../components/Content';

// this will probably be the ReportIndex page

export default class Placeholder extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      user: this.props.user,
      report: this.props.report,
      parts: this.props.parts,
      part: '',
      section: '',
      sections: [],
    };
    this.indexSectionShow = this.indexSectionShow.bind(this);
  }

  getSections = () => {
    $.getJSON(`/users/${this.state.user.id}/reports/${this.state.report.id}/sections.json`, (response) => {
      this.setState({
        sections: response
      });
    });
  };

  indexSectionShow(section, part) {
    this.setState({ section: section, part: part })
  };

  showState = () => {
   console.log("This is state placeholder", this.state);
  };

  render() {
    return (
      <div>
        <div className="menu">
          <Menu
            user={this.props.user}
            report={this.props.report}
            parts={this.props.parts}
            indexSectionShow={this.indexSectionShow}
            getSections={this.getSections}
            sections={this.state.sections}
          />
        </div>
        <div className="display">
          <Content
            user={this.props.user}
            report={this.props.report}
            part={this.state.part}
            section={this.state.section}
          />
        </div>
        <button onClick={this.showState}>Click me for state on placeholder</button>
      </div>
    )
  }
}
