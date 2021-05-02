export default class User {
  pseudo?: string;
  googleId?: number;
  email?: string;
  emailConfirmed?: boolean;
  mdp?: string;
  mdp2?: string;
  admin!: boolean;
  abonneNews?: boolean;
}
