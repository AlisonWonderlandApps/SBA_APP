
/*
email matcher regex
Matches
foo@bar.com | foobar@foobar.com.au
Non-Matches
foo@bar | $$$@bar.com
Credit: http://emailregex.com/

Password regex:
Description
Password expression. Password must be min 4 digits long and include
  at least one numeric digit & one alphabet character.
Matches
123s | asdf1234 | asp123
Non-Matches
asdf | asdf12345 | password | 1234
*/

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
