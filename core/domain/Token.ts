export default class Token {
  pseudo!: string;
  email!: string;
  confirmed_email!: boolean;
  password!: string;
  is_admin!: boolean;
  is_subscribed!: boolean;
  iat!: number;
  exp!: number;
}
