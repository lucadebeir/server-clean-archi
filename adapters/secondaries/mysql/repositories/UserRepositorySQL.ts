import User from "../../../../core/domain/User";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import UserSequelize from "../entities/User.model";
import ResetTokenSequelize from "../entities/ResetToken.model";
import Token from "../../../../core/domain/Token";
import crypto from "crypto";
import {OAuth2Client} from "google-auth-library";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class UserRepositorySQL implements UserRepository {

    checkEmailConfirmed(email: any): Promise<boolean> {
        return UserSequelize.findOne({
            where: {
                email: email,
            }
        })
            .then((user) => {
                return !!user?.confirmed_email;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    existByEmail(email: any): Promise<boolean> {
        return UserSequelize.findOne({
            where: {
                email: email,
            },
        })
            .then((user) => {
                return !!user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    register(user: User): Promise<User> {
        return UserSequelize.create(user)
            .then((user: any) => {
                return user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    gRegister(user: User): Promise<User> {
        return UserSequelize.create(user)
            .then((user: any) => {
                return user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    login(email: any, password: any): Promise<Token> {
        return UserSequelize.findOne({
            where: {
                email: email,
            },
        })
            .then((user: any) => {
                return user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    async gLogin(token: any): Promise<Token> {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return UserSequelize.findOne({
            where: {
                email: payload?.email,
            },
        })
            .then((user: any) => {
                return user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    existByPseudo(pseudo: any): Promise<boolean> {
        return UserSequelize.findOne({
            where: {
                pseudo: pseudo,
            },
        })
            .then((user) => {
                return !!user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findById(pseudo: any): Promise<User> {
        return UserSequelize.findOne({
            where: {
                pseudo: pseudo,
            },
        })
            .then((user: any) => {
                return user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findAllAbonneUsers(): Promise<User[]> {
        return UserSequelize.findAll({
            where: {
                is_subscribed: true,
            },
        })
            .then((users) => {
                return users;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findAllAbonneMailUsers(): Promise<{ name: any; address: any }[]> {
        return UserSequelize.findAll({
            attributes: {
                include: [
                    ["pseudo", "name"],
                    ["email", "address"],
                ],
                exclude: [
                    "pseudo",
                    "email",
                    "confirmed_email",
                    "is_admin",
                    "is_subscribed",
                    "password",
                ],
            },
            where: {
                is_subscribed: true,
            },
        })
            .then((users: any) => {
                return users;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    updatePassword(pseudo: any, hash: any): Promise<User> {
        return UserSequelize.update(
            {password: hash},
            {where: {pseudo: pseudo}}
        )
            .then((user: any) => {
                return user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    update(user: User): Promise<User> {
        return UserSequelize.update(
            {
                email: user.email,
                is_subscribed: user.is_subscribed,
            },
            {where: {pseudo: user.pseudo}}
        )
            .then((userUpdate) => {
                return user;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    deleteById(pseudo: any): Promise<string> {
        return UserSequelize.destroy({
            where: {
                pseudo: pseudo,
            },
        })
            .then(() => {
                return "User deleted!";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    forgetPassword(email: any): Promise<{ pseudo: any; token: any }> {
        return UserSequelize.findOne({
            where: {
                email: email,
            },
        })
            .then((user: any) => {
                const reset_token = {
                    pseudo: user.pseudo,
                    token: crypto.randomBytes(16).toString("hex"),
                };
                return ResetTokenSequelize.create(reset_token).then(() => {
                    return {
                        pseudo: reset_token.pseudo,
                        token: reset_token.token,
                    };
                });
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    checkValideToken(token: any): Promise<string> {
        return ResetTokenSequelize.findOne({
            where: {
                token: token,
            },
        })
            .then((user) => {
                return UserSequelize.findOne({where: {pseudo: user?.pseudo}})
                    .then(() => {
                        return "Token verifié.";
                    })
                    .catch((err) => {
                        throw new TechnicalException(err.message);
                    });
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            })
    }

    updatePasswordWithToken(token: any, hash: any): Promise<string> {
        return ResetTokenSequelize.findOne({
            where: {token: token},
        })
            .then((user) => {
                return UserSequelize.update(
                    {password: hash},
                    {
                        where: {pseudo: user?.pseudo}
                    }
                )
                    .then(() => {
                        return ResetTokenSequelize.destroy({
                            where: {
                                pseudo: user?.pseudo,
                                token: user?.token,
                            },
                        })
                            .then(() => {
                                return "Mot de passe changé avec succès";
                            })
                            .catch((err) => {
                                throw new TechnicalException(err.message);
                            });
                    })
                    .catch((err) => {
                        throw new TechnicalException(err.message);
                    });
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findAllExistingEmails(): Promise<string[]> {
        return UserSequelize.findAll({
            attributes: ["email"],
        })
            .then((users: any) => {
                return users;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findAllExistingPseudo(): Promise<string[]> {
        return UserSequelize.findAll({
            attributes: ["pseudo"],
        })
            .then((users: any) => {
                return users;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    verifyMail(pseudo: string): Promise<string> {
        return UserSequelize.update(
            {confirmed_email: true},
            {
                where: {pseudo: pseudo}
            })
            .then(() => {
                return "Email vérifié !";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
