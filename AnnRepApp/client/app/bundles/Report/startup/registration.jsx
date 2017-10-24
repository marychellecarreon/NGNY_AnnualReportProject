import ReactOnRails from 'react-on-rails';

import ReportIndex from '../components/ReportIndex';

import Header from '../components/Header';

import Menu from '../components/Menu';

import EditPart from '../components/EditPart';

import NewPart from '../components/NewPart';

import Content from '../components/Content';

import EditSection from '../components/EditSection';

import NewSection from '../components/NewSection';

import Placeholder from '../components/Placeholder';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  ReportIndex,
  Header,
  Placeholder,
  Menu,
  NewPart,
  EditPart,
  EditSection,
  NewSection,
  Content
});
