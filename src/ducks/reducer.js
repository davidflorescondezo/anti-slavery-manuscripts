import { combineReducers } from 'redux';
import login from './login';
import collections from './collections';
import project from './project';
import subject from './subject';
import subjectViewer from './subject-viewer';
import annotations from './annotations';

export default combineReducers({
  login,
  collections,
  project,
  subject,
  subjectViewer,
  annotations,
});
