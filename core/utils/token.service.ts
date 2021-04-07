import TokenDomain from "../domain/Token.domain";

export const isAdmin = (token: TokenDomain) => {
  return token.admin;
};

export const isLogin = (token: TokenDomain) => {
  return Date.now() < token.exp;
};

export const isExpired = (token: TokenDomain) => {
  return Date.now() > token.exp;
};

/*export const isEmailValid = (email: string) => {
  return validate(email);
};*/
