export default class User {
  pseudo?: string;
  email?: string;
  emailConfirmed?: boolean;
  mdp?: string;
  mdp2?: string;
  admin!: boolean;
  abonneNews?: boolean;
}
