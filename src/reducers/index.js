//reducers index

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import AccountsReducer from './AccountsReducer';
import MainReducer from './MainReducer';
import TripReducer from './TripsReducer';
import UserReducer from './UserReducer';
import ReceiptsReducer from './ReceiptsReducer';
import PhotoReducer from './PhotoReducer';

//'wire up' the reducer
export default combineReducers({
  auth: AuthReducer,
  login: LoginReducer,
  signup: SignupReducer,
  accounts: AccountsReducer,
  main: MainReducer,
  trips: TripReducer,
  user: UserReducer,
  receipts: ReceiptsReducer,
  photos: PhotoReducer
});
