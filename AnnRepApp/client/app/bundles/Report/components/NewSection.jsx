import PropTypes from 'prop-types';
import React from 'react';

export default class NewSection extends React.Component {
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
      part: this.props.part
    }
  };

  handleCreate() {
    let title = this.state.title;

     $.ajax({
       url: `/users/${this.props.user.id}/reports/${this.props.report.id}/sections`,
       type: 'POST',
       data: { section: { title: title, part_id: this.props.part.id } },
       success: (response) => {
         console.log('Section saved', response);
         this.props.getSections();
       }
     });
  }

  render() {
    return (
      <div>
        <input onChange={ (e) => this.setState({ title: e.target.value }) } placeholder='Enter Title' />
        <button onClick={() => this.handleCreate()}>Create</button>
      </div>
    )
  }
}
