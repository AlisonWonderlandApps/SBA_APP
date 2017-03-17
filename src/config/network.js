/*
* API Requests strings
*/

export const ROOT_URL = 'https://api.shoeboxed.com:443/v2/';

//Headers: Authorization Header Required for all
//Params: none
/* GETS */
export const GET_USER_ACCOUNTS = 'user/accounts/',

//Params: Account ID required
/* GET, PUT, DELETE, CREATE ACCOUNT supported */
export const ACCOUNT_URL = 'accounts/'; //{accountID}/

/*GET & PUT supported (list, update) */
export const ACCOUNT_SETTINGS_URL = ACCOUNT_URL + '/settings/';
export const

/*ERROR STATUS CODES*/
export const UNAUTHORIZED = {401};
export const FORBIDDED = {403};
export const NOT_FOUND = {404};
export const UNPROCESSABLE_ENTITY = {422};
