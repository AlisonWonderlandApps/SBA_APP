//reducers index

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import AccountsReducer from './AccountsReducer';
import TripReducer from './TripsReducer';
import UserReducer from './UserReducer';
import ReceiptsReducer from './ReceiptsReducer';
import SearchReducer from './SearchReducer';
import EditReducer from './EditReducer';

//'wire up' the reducer
export default combineReducers({
  auth: AuthReducer,
  login: LoginReducer,
  signup: SignupReducer,
  accounts: AccountsReducer,
  trips: TripReducer,
  user: UserReducer,
  receipts: ReceiptsReducer,
  searchIt: SearchReducer,
  edit: EditReducer
});
