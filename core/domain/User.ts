import {BusinessException} from "../exceptions/BusinessException";

export default class User {
    pseudo?: string;
    id_google?: number;
    email?: string;
    confirmed_email?: boolean;
    password?: string;
    confirmed_password?: string;
    is_admin?: boolean;
    is_subscribed?: boolean;

    checkIfValueIsValid = (chiffre: number, valueS?: string, champ?: string, inf?: boolean): boolean => {
        if (!inf) {
            if (valueS && valueS.length > chiffre)
                throw new BusinessException("Un " + champ + " ne peut pas comporter plus de " + chiffre + " caractères");
            else return true;
        } else {
            if (valueS && valueS.length < chiffre)
                throw new BusinessException("Un " + champ + " ne peut pas comporter moins de " + chiffre + " caractères");
            else return true;
        }
    };
}
