export default class TokenDomain {
  pseudo!: string;
  email!: string;
  emailConfirmed!: boolean;
  mdp!: string;
  admin!: boolean;
  abonneNews!: boolean;
  iat!: number;
  exp!: number;
}
