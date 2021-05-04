export default class User {
  pseudo?: string;
  googleId?: number;
  email?: string;
  emailConfirmed?: boolean;
  password?: string;
  confirmedPassword?: string;
  admin!: boolean;
  abonneNews?: boolean;
}
