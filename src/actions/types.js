 /*
* contains the definitions of all the different types
* used by reducer/actions in this. Like a strings file
*/

//AuthActions ??? should this be in login or probably user??
//export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';
export const FETCH_MESSAGE = 'fetch_message';
export const USER_LOGGED_IN = 'user_logged_in';
//
export const GET_AUTH_TOKEN = 'get_auth_token';
export const SET_AUTH_TOKEN = 'set_auth_token';

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

//UserActions
export const USER_NAME_FETCH = 'set_user_name';
export const USER_INFO_FETCH = 'fetch_user_info';
export const USER_INFO_FETCH_SUCCESS = 'user_info_fetch_success';
export const USER_INFO_FETCH_FAIL = 'user_info_fetch_fail';
export const USER_SETTINGS_FETCH = 'fetch_user_settings';
export const USER_SETTING_FETCH_SUCCESS = 'settings_fetch_success';
export const USER_SETTINGS_FETCH_FAIL = 'settings_fetch_fail';
export const USER_PLAN_FETCH = 'plan_fetch';
export const USER_PLAN_FETCH_SUCCESS = 'plan_fetch_success';
export const USER_PLAN_FETCH_FAIL = 'plan_fetch_fail';
//
export const PLAN_FETCH = 'fetch_plan';
export const PLAN_FETCH_SUCCESS = 'fetch_plan_success';
export const PLAN_FETCH_FAIL = 'fetch_plan_fail';
export const PLAN_SET = 'set_plan';
export const PLANTYPE_SET = 'set_plantype';
export const DBEMAIL_SET = 'dbemail_set';
export const SET_USER_EMAIL = 'set_user_email';
export const SET_PAYMENT_TYPE = 'set_payment_type';

//AccountActions
export const GO_TO_MAIN = 'go_to_main';
export const GO_TO_ACCOUNTS = 'go_to_accounts';
export const ACCOUNTS_LOAD = 'load_accounts';
export const LABELS_LOAD = 'load_labels';
export const SET_CUR_ACCOUNT = 'set_current_account';
export const SET_CUR_ACCOUNT_NAME = 'set_cur_acc_name';
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
export const SET_VENDOR = 'set_vendor';
export const SET_DATE = 'set_date';
export const SET_CATEGORY = 'set_category';
export const SET_COST = 'set_cost';
export const SET_NUM_RECEIPTS = 'set_number_of_receipts';
export const SET_LATEST_RECEIPT = 'set_latest_receipt';
export const RECEIPT_ADD_NEW = 'receipts_add_new';
export const RECEIPT_CREATE_SUCCESS = 'receipts_add_new_success';
export const RECEIPT_CREATE_FAIL = 'receipts_add_new_fail';
export const RECEIPT_UPDATE_INFO = 'receipts_edit';
export const RECEIPT_DELETE = 'receipt_delete';
export const RECEIPT_DELETE_SUCCESS = 'receipt_delete_success';
export const RECEIPT_DELETE_FAIL = 'receipt_delete_fail';
export const RECEIPTS_SEARCH = 'receipt_search';
export const RECEIPT_ADD_CATEGORY = 'receipt_add_category';
export const RECEIPT_DELETE_CATEGORY = 'receipt_delete_category';
export const SET_LIST = 'set_list';
export const RESET_RECEIPTS = 'reset_receipts';
export const LOAD_A_RECEIPT = 'load_a_receipt';
export const LOAD_A_RECEIPT_SUCCESS = 'load_a_receipt_success';
export const LOAD_A_RECEIPT_FAIL = 'load_a_receipt_fail';
export const SET_NEW_RECEIPT_CATEGORY = 'set_new_receipt_category';
export const RESET_NEW_RECEIPT = 'reset_new_receipt_data';

export const PROCESSING_FETCH_FAIL = 'processing_fetch_fail';
export const PROCESSING_FETCH_SUCCESS = 'processing_fetch_success';
export const PROCESSING_FETCH = 'processing_fetch';
export const SET_PROCESSING_NUM = 'set_processed_num';
export const REIMBURSABLES_FETCH = 'fetch_Reimbursables';
export const REIMBURSABLES_FETCH_SUCCESS = 'fetch_reimbursables_success';
export const REIMBURSABLES_FETCH_FAIL = 'fetch_reimbursables_fail';
export const SET_REIMBURSABLE_NUM = 'set_reimburseable_num';
export const CATEGORIES_FETCH_SUCCESS = 'fetch_categories_success';
export const CATEGORIES_FETCH_FAIL = 'fetch_categories_fail';
export const ADD_RECEIPT = 'add_receipt';
export const CATEGORY_SEARCH = 'filter_by_category';
export const CATEGORY_SEARCH_SUCCESS = 'filter_by_category_success';
export const CATEGORY_SEARCH_FAIL = 'filter_by_category_fail';
export const RECEIPTS_BY_CATEGORY_ADD = 'add_receipt_by_category_item';
export const SAVE_IMAGE_DATA = 'save_image_data';

//PhotosActions
export const PHOTO_ADD = 'add_a_photo';
export const PHOTO_NAME_ADD = 'add_photo_name';
export const PHOTO_URI_ADD = 'add_photo_uri';
export const SET_RECEIPT_CATEGORY = 'set_receipt_category';
export const SET_RECEIPT_NOTE = 'set_receipt_note';
export const SAVE_RECEIPT_LOCAL = 'save_receipt_locally';
export const USE_PICTURE = 'use_picture';

//TripsActions (nb: trips are basically a category of
//    receipt with some additional functionality).
export const TRIPS_FETCH = 'trips_fetch_all';
export const TRIPS_FETCH_SUCCESS = 'trips_fetch_success';
export const SET_TRIP_DATE = 'set_trip_date';
export const SET_TRIP_COST = 'set_trip_cost';
export const SET_TRIP_VENDOR = 'set_trip_vendor';
export const TRIPS_FETCH_FAIL = 'trips_fetch_fail';
export const SET_LATEST_TRIP = 'set_latest_trip';
export const TRIP_CREATE_NEW = 'trips_add_new';
export const TRIP_CREATE_SUCCESS = 'trips_add_new_success';
export const TRIP_CREATE_FAIL = 'trips_add_new_fail';
export const TRIP_UPDATE_INFO = 'trips_edit';
export const TRIP_DELETE = 'trip_delete';
export const TRIPS_SEARCH = 'trips_search';
export const TRIPS_START = 'trips_start';
export const TRIPS_END = 'trips_end';
export const RESET_TRIPS = 'reset_trips';
export const SET_CURRENT_LOCATION = 'set_current_trip_location';

//SearchActions
export const SEARCH_TEXT_CHANGED = 'search_text_changed';
export const SEARCH_DATA = 'search_data';
