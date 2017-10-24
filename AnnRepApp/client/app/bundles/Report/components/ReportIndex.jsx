import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';


// styled-components: used to change the styling of the page, user input directly changes this.
const Header = styled.header.attrs({
  backgroundcolor: props => props.backgroundcolor || `palevioletred`,
})`
  background-color: ${props => props.backgroundcolor};
  width: 100%;
  height: 100px;
`;

const Footer = styled.footer.attrs({
  backgroundcolor: props => props.backgroundcolor || `red`,
})`
  background-color: ${props => props.backgroundcolor};
  width: 100%;
  height: 100px;
`;


export default class ReportIndex extends React.Component {
  static propTypes = {
    parts: PropTypes.array, // this is passed from the Rails view
    report: PropTypes.object,
    currentUser: PropTypes.number,
  };

  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    const report = this.props.report;
    this.state = {
      parts: [],
      title: report.title,
      header_colour: report.header_colour,
      footer_colour: report.footer_colour,
      footer_date: report.footer_date,
      footer_company: report.footer_company,
      user_id: report.user_id,
      currentUser: this.props.report.user_id,
      displayHeadColorPicker: false,
      displayFootColorPicker: false,
      headTitleEditable: false,
      footCompanyEditable: false,
      footDateEditable: false,
    };

    this.updateHeadColour = this.updateHeadColour.bind(this);
    this.updateFootColour = this.updateFootColour.bind(this);
    this.handleCreateNew = this.handleCreateNew.bind(this);
    this.showState = this.showState.bind(this);
  };

  showState = () => {
    console.log("This is report", this.state);
  };

  // colour picker open and close
  handleClick = (arg) => {
    console.log("this is arg in handleclick", arg);
    if ( arg == "head") {
      this.setState({ displayHeadColorPicker: !this.state.displayHeadColorPicker })
    } else if ( arg == "foot")  {
      this.setState({ displayFootColorPicker: !this.state.displayFootColorPicker })
      };
  };

  handleClose = (arg) => {
    console.log("this is arg in handleclick", arg);
    if ( arg == "head" ) {
      this.setState({ displayHeadColorPicker: false })
    } else if ( arg == "foot" ) {
      this.setState({ displayFootColorPicker: false })
    };
  };

  // update colour of header and footer
  // NOTE fix conflict between footer changing header colour
  updateHeadColour(color, event) {
    this.setState({ header_colour: color.hex });
  };

  updateFootColour(foot, event) {
    this.setState({ footer_colour: foot.hex });
  };

  // api to rails
  componentDidMount() {
    this.getReports();
  // NOTE  CREATE DEFAULT STATE WHEN COMPONENT MOUNTS
  }

  // NOTE - when a user creates a new report are we going to get the styling from
  // the database or are we going to have the state determine the default styling.
  getReports() {
    $.getJSON(`/users/${this.state.currentUser}/reports/1.json`, (response) => {
      console.log("this is response", response);
      this.setState({
         report: response
       })
     });
  }

  handleCreateNew() {
    console.log("this is report in new", this.state.report);
    let state = this.state;
    $.ajax({
      url: `/users/${this.state.currentUser}/reports`,
      type: 'POST',
      data: { report: { id: null,
                        title: state.title,
                        header_colour: state.header_colour,
                        footer_colour: state.footer_colour,
                        footer_date: state.footer_date,
                        footer_company: state.footer_date,
                        user_id: state.user_id }
            },
      success: () => {
        console.log('You did it');
      }
    });
 };


  updateName = (name) => {
    this.setState({ name });
  };

  // text enter buttons
  updateText(arg, e) {
    console.log("this is arg", arg);
    console.log("this is e", e);
    if ( arg === "headTitle" ) {
      this.setState({ report: { title: e.target.value }});
    } else if (arg === "footCompany") {
      this.setState({ report: { footer_company: e.target.value }});
    } else if (arg === "footDate") {
      this.setState({ report: { footer_date: e.target.value }});
    } else {
      console.log("What's going on??");
    }
  };

  handleChange = (e) => {
    console.log("This is e", e);
    console.log("This is e.target", e.target);
    console.log("This is e.target.value", e.target.value);
    console.log("This is attribute", this.state.report.title);
  }

  handleEdit = (whatEdit) => {
    console.log("whatEdit", whatEdit);
    if ( whatEdit === "headTitle" ) {
      this.setState({headTitleEditable: !this.state.headTitleEditable})
    } else if (whatEdit === "footCompany") {
      this.setState({footCompanyEditable: !this.state.footCompanyEditable})
    } else if (whatEdit === "footDate") {
      this.setState({footDateEditable: !this.state.footDateEditable})
    } else {
      console.log("What's going on??");
    }
  };



  render() {
    var headTitle = this.state.headTitleEditable ? <input type='text'
                                            defaultValue={this.state.title}
                                            onChange={(e) => this.handleChange(e)}/>
                                    : <p>{this.state.title}</p>

    var footCompany = this.state.footCompanyEditable ? <input type='text'
                                            defaultValue={this.state.footer_company}
                                            onChange={(e) => this.setState({ footer_company: e.target.value })}/>
                                    : <p>{this.state.footer_company}</p>

    var footDate = this.state.footDateEditable ? <input type='text'
                                            defaultValue={this.state.footer_date}
                                            onChange={(e) => this.setState({ footer_date: e.target.value })}/>
                                    : <p>{this.state.footer_date}</p>

    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    const body = {
      width: '100%',
      height: '500px',
      backgroundColor: `black`,
    }

    return (
      <div>
        <Header backgroundcolor={this.state.header_colour}>

          <h1>{headTitle}</h1>
          <button onClick={() => this.handleEdit("headTitle")}>{this.state.headTitleEditable ? 'Submit' : 'Edit' }</button>

          <button onClick={ () => this.handleClick("head") }>Pick Color</button>
          { this.state.displayHeadColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={ () => this.handleClose("head") }/>
            <ChromePicker color={this.state.header_colour} onChangeComplete={ this.updateHeadColour } />
          </div> : null }
        </Header>
        <br />
        <br />
        <hr />
        <br />
        <div style={ body }>
          <p>This is the body</p>
        </div>
        <br />
        <br />
        <hr />
        <br />
        <Footer backgroundcolor={this.state.footer_colour}>

          <h1>{footCompany}</h1>
          <button onClick={() => this.handleEdit("footCompany")}>{this.state.footCompanyEditable ? 'Submit' : 'Edit' }</button>

          <h1>{footDate}</h1>
          <button onClick={() => this.handleEdit("footDate")}>{this.state.footDateEditable ? 'Submit' : 'Edit' }</button>

          <button onClick={() => this.handleClick("foot") }>Pick Color</button>
          { this.state.displayFootColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={() => this.handleClose("foot") }/>

            <ChromePicker color={this.state.footer_colour} onChangeComplete={ this.updateFootColour } />
          </div> : null }

        </Footer>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <br />
        <hr />
        <br />
        <button type="submit" onClick={this.showState}>STATE ME!!</button>
        <button type="submit" onClick={this.handleCreateNew}>Click to Save Changes</button>
      </div>
    );
  }
}
