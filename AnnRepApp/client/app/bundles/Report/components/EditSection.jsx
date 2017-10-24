import PropTypes from 'prop-types';
import React from 'react';

export default class Section extends React.Component {
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
      report: this.props.report,
      part: this.props.part,
      section: this.props.section
    }
  };

  handleEdit() {
  if (this.state.editable) {
    var id = this.state.section.id;
    var title = this.state.title;
    var section = { id: id, title: title };
    this.props.sectionUpdate(section, this.state.user, this.state.report);
  }
    this.setState({ editable: !this.state.editable })
  }

  handleDelete() {
    $.ajax({
    url: `/users/${this.state.user.id}/reports/${this.state.report.id}/sections/${this.state.section.id}`,
    type: 'DELETE',
    success: (response) => {
      console.log('successfully removed part', response);
      this.props.getSections();
    }
    });
  }

  render() {
    let sectionTitle = this.state.editable ?
      <input type='text'
             defaultValue={this.props.section.title}
             onChange={ (e) => this.setState({ title: e.target.value }) }/>
    : this.props.section.title

    return (
      <div>
        {sectionTitle}
        <button onClick={() => this.handleDelete()}>X</button>
        <button onClick={() => this.handleEdit()}>{this.state.editable ? 'Submit' : '->' }</button>
      </div>
    )
  }
}
