import PropTypes from 'prop-types';
import React from 'react';

export default class NewPart extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      editable: false,
      title: '',
      user: this.props.user,
      report: this.props.report
    }
  };

  handleCreate() {
    let title = this.state.title;

    $.ajax({
      url: `/users/${this.state.user.id}/reports/${this.state.report.id}/parts`,
      type: 'POST',
      data: { part: { title: title, report_id: this.state.report.id } },
      success: (response) => {
        console.log('Report saved', response);
        this.props.getParts();
      }
    });
  }

  render() {
    return (
      <div>
        <h5>Create New Part</h5>
        <input onChange={ (e) => this.setState({ title: e.target.value }) } placeholder='Enter Title' />
        <button onClick={() => this.handleCreate()}>Create</button>
      </div>
    )
  }
}
