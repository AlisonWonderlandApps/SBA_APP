/*
* contains the definitions of all the different types
* used by reducer/actions in this. Like a strings file
*/

//RouterActions
export const NAVBAR_LEFT_RENDER = 'left_navbar_render';
export const NAVBAR_RIGHT_RENDER = 'right_navbar_render';

//AuthActions
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const FETCH_MESSAGE = 'fetch_message';
export const USER_LOGGED_IN = 'user_logged_in';
export const TOKEN_FETCHED = 'token_fetched';

//LoginActions
export const EMAIL_CHANGED = 'email_changed';
export const EMAIL_VALID = 'email_valid';
export const PASSWORD_CHANGED = 'password_changed';
export const CONFIRM_PASSWORD_CHANGED = 'confirm_password_changed';
export const PASSWORD_VALID = 'password_valid';
export const LOGIN_USER = 'login_user';
export const LOGIN_FB_USER = 'login_fb_user';
export const LOGIN_GOOGLE_USER = 'login_google_user';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const RESET_PW = 'clear_password';
export const RESET = 'reset_to_inital_state';
export const LOAD_ACCOUNTS_SUCCESS = 'load_accounts_success';
export const LOAD_ACCOUNTS_FAIL = 'load_accounts_fail';
export const NEXT_PAGE = 'go_to_next_page';

//SignUpActions
export const EMAIL_CHANGED_SU = 'email_changed_su';
export const EMAIL_VALID_SU = 'email_valid_su';
export const PASSWORD_CHANGED_SU = 'password_changed_su';
export const PASSWORD_VALID_SU = 'password_valid_su';
export const PASSWORD_MATCH = 'password_match';
export const SIGNUP_USER = 'signup_user';
export const SIGNUP_FB_USER = 'signup_fb_user';
export const SIGNUP_GOOGLE_USER = 'signup_google_user';
export const SIGNUP_USER_SUCCESS = 'signup_user_success';
export const SIGNUP_USER_FAIL = 'signup_user_fail';
export const RESET_SU = 'reset_to_inital_state_su';

//AccountActions
export const ACCOUNTS_LOAD = 'load_accounts';
export const LABELS_LOAD = 'load_labels';
export const SET_CUR_ACCOUNT = 'set_current_account';
export const ACCOUNTS_FETCH = 'accounts_fetch_all';
export const ACCOUNTS_FETCH_SUCCESS = 'accounts_fetch_success';
export const ACCOUNTS_FETCH_FAIL = 'accounts_fetch_fail';
 // ---- //
export const ACCOUNTS_ADD_USER = 'accounts_add_user';
export const ACCOUNT_CREATE_NEW = 'accounts_add_new';
export const ACCOUNT_CREATE_SUCCESS = 'accounts_add_new_success';
export const ACCOUNT_CREATE_FAIL = 'accounts_add_new_fail';
export const ACCOUNT_CHANGE_PLAN = 'accounts_change_plan';
export const ACCOUNT_CHANGE_SUCCESS = 'accounts_change_success';
export const ACCOUNT_CHANGE_FAIL = 'accounts_change_fail';
export const ACCOUNT_ADD_USER = 'accounts_add_user';
export const ACCOUNT_ADD_USER_SUCCESS = 'accounts_add_user_success';
export const ACCOUNT_UPDATE_INFO = 'accounts_edit';
export const ACCOUNT_DELETE = 'account_delete';

//ReceiptsActions
export const RECEIPTS_FETCH = 'receipts_fetch_all';
export const RECEIPTS_FETCH_SUCCESS = 'receipts_fetch_success';
export const RECEIPTS_FETCH_FAIL = 'receipts_fetch_fail';
export const SET_LATEST_RECEIPT = 'set_latest_receipt';
export const RECEIPT_CREATE_NEW = 'receipts_add_new';
export const RECEIPT_CREATE_SUCCESS = 'receipts_add_new_success';
export const RECEIPT_CREATE_FAIL = 'receipts_add_new_fail';
export const RECEIPT_UPDATE_INFO = 'receipts_edit';
export const RECEIPT_DELETE = 'receipt_delete';
export const RECEIPTS_SEARCH = 'receipt_search';
export const RECEIPT_ADD_CATEGORY = 'receipt_add_category';
export const RECEIPT_DELETE_CATEGORY = 'receipt_delete_category';

export const PROCESSED_FETCH_FAIL = 'processed_fetch_fail';
export const PROCESSED_FETCH_SUCCESS = 'processed_fetch_success';
export const PROCESSED_FETCH = 'processed_fetch';
export const SET_PROCESSED_NUM = 'set_processed_num';
export const SET_REIMBURSEABLE_NUM = 'set_reimburseable_num';

//TripsActions (nb: trips are basically a category of
//    receipt with some additional functionality).
export const TRIPS_FETCH = 'trips_fetch_all';
export const TRIPS_FETCH_SUCCESS = 'trips_fetch_success';
export const TRIPS_FETCH_FAIL = 'trips_fetch_fail';
export const SET_LATEST_TRIP = 'set_latest_trip';
export const TRIP_CREATE_NEW = 'trips_add_new';
export const TRIP_CREATE_SUCCESS = 'trips_add_new_success';
export const TRIP_CREATE_FAIL = 'trips_add_new_fail';
export const TRIP_UPDATE_INFO = 'trips_edit';
export const TRIP_DELETE = 'trip_delete';
export const TRIPS_SEARCH = '';
export const TRIPS_START = '';

//MainNavActions
export const GET_AUTH_TOKEN = 'get_auth_token';
export const SET_AUTH_TOKEN = 'set_auth_token';

//SettingsActions
export const SETTINGS_FETCH = 'settings_fetch_all';
export const SETTINGS_FETCH_SUCCESS = 'settings_fetch_success';
export const SETTINGS_FETCH_FAIL = 'settings_fetch_fail';
