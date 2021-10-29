import TokenDomain from "../domain/Token.domain";

export const isAdmin = (token: TokenDomain) => {
  return token.is_admin;
};

export const isLogin = (token: TokenDomain) => {
  return Date.now() < token.exp * 1000;
};

export const isExpired = (token: TokenDomain) => {
  return Date.now() > token.exp * 1000;
};

/*export const isEmailValid = (email: string) => {
  return validate(email);
};*/
