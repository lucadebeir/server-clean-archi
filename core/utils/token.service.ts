import TokenDomain from "../domain/Token.domain";

export const isAdmin = (token: TokenDomain) => {
  return token.admin;
};

export const isLogin = (token: TokenDomain) => {
  return Date.now() < token.exp;
};
