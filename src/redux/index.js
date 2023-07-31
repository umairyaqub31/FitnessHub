import {combineReducers} from 'redux';
// import PopupReducers from "./PopupReducers";
import {reducer as UserReducer} from './UserRedux';
import {reducer as TraineeReducer} from './TraineeRedux';
import {reducer as PackageReducer} from './PackageRedux';

const appReducer = combineReducers({
  User: UserReducer,
  Trainee: TraineeReducer,
  Package: PackageReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'LOGOUT_RESETSTATE') state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
