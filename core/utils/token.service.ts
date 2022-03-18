import Token from "../domain/Token";

export const isAdmin = (token: Token) => {
  return token.is_admin;
};

export const isLogin = (token: Token) => {
  return Date.now() < token.exp * 1000;
};

export const isExpired = (token: Token) => {
  return Date.now() > token.exp * 1000;
};

/*export const isEmailValid = (email: string) => {
  return validate(email);
};*/
