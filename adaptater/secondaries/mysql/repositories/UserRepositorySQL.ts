import User from "../../../../core/domain/User";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import UserSequelize from "../entities/User.model";
import bcrypt from "bcrypt";
import ResetTokenSequelize from "../entities/ResetToken.model";
import TokenDomain from "../../../../core/domain/Token.domain";
import crypto from "crypto";
import {OAuth2Client} from "google-auth-library";

export default class UserRepositorySQL implements UserRepository {
  checkEmailConfirmed(pseudo: any): Promise<boolean> {
    return UserSequelize.findOne({
      where: {
        pseudo: pseudo,
      },
    })
      .then((user) => {
        if (user?.confirmed_email) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  existByEmail(email: any): Promise<boolean> {
    return UserSequelize.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  register(user: User): Promise<User> {
    const userData: any = {
      pseudo: user.pseudo,
      email: user.email,
      password: user.password,
      confirmed_password: user.confirmed_password,
      is_admin: user.is_admin,
      is_subscribed: user.is_subscribed,
    };
    userData.password = bcrypt.hashSync(userData.password, 10);
    return UserSequelize.create(userData)
      .then((user: any) => {
        return user;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  gRegister(user: User): Promise<User> {
    console.log(user)
    const userData: any = {
      pseudo: user.pseudo,
      id_google: user.id_google,
      email: user.email,
      is_subscribed: user.is_subscribed,
    };
    return UserSequelize.create(userData)
      .then((user: any) => {
        return user;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  login(email: any, password: any): Promise<TokenDomain> {
    console.log(email, password);
    return UserSequelize.findOne({
      where: {
        email: email,
      },
    })
      .then((user: any) => {
        if (!user) {
          throw new Error("Mot de passe et/ou email incorrect");
        } else if (!user.confirmed_email) {
          throw new Error(
            "Vous devez vérifier votre adresse mail avant de pouvoir vous connecter ! :)"
          );
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            return user;
          } else {
            throw new Error("Mot de passe et/ou email incorrect");
          }
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async gLogin(token: any): Promise<TokenDomain> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload) {
      return UserSequelize.findOne({
        where: {
          email: payload.email,
        },
      })
        .then((user: any) => {
          if (!user) {
            throw new Error("Email incorrect");
          } else {
            if (user.id_google !== payload.sub) {
              throw new Error("GoogleId non valide");
            } else if (!user.confirmed_email) {
              throw new Error(
                "Vous devez vérifier votre adresse mail avant de pouvoir vous connecter ! :)"
              );
            } else {
              return user;
            }
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      throw new Error("");
    }
  }

  existByPseudo(pseudo: any): Promise<boolean> {
    return UserSequelize.findOne({
      where: {
        pseudo: pseudo,
      },
    })
      .then((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findById(pseudo: any): Promise<User> {
    return UserSequelize.findOne({
      where: {
        pseudo: pseudo,
      },
    })
      .then((user) => {
        if (user) {
          return user;
        } else {
          throw new Error("L'utilisateur n'existe pas");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAllAbonneUsers(): Promise<User[]> {
    return UserSequelize.findAll({
      where: {
        is_subscribed: true,
      },
    })
      .then((users) => {
        if (users.length != 0) {
          return users;
        } else {
          throw new Error("Il n'y a aucun abonné à la newsletter !");
        }
      })
      .catch((err) => {
        throw new Error(err);
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
        if (users.length != 0) {
          return users;
        } else {
          throw new Error("Il n'y a aucun abonné à la newsletter !");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updatePassword(pseudo: any, newPassword: any): Promise<User> {
    const hash = bcrypt.hashSync(newPassword, 10);
    return UserSequelize.update(
      { password: hash },
      { where: { pseudo: pseudo } }
    )
      .then((user: any) => {
        if (user) {
          return user;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  update(user: User): Promise<User> {
    return UserSequelize.update(
      {
        email: user.email,
        is_subscribed: user.is_subscribed,
      },
      { where: { pseudo: user.pseudo } }
    )
      .then((userUpdate) => {
        if (userUpdate) {
          return user;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
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
        throw new Error(err);
      });
  }

  forgetPassword(email: any): Promise<{ pseudo: any; token: any }> {
    return UserSequelize.findOne({
      where: {
        email: email,
      },
    })
      .then((user: any) => {
        if (user) {
          var resettoken = {
            pseudo: user.pseudo,
            token: crypto.randomBytes(16).toString("hex"),
          };
          return ResetTokenSequelize.create(resettoken).then(() => {
            return {
              pseudo: resettoken.pseudo,
              token: resettoken.token,
            };
          });
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  checkValideToken(token: any): Promise<string> {
    return ResetTokenSequelize.findOne({
      where: {
        token: token,
      },
    }).then((user) => {
      if (!user) {
        throw new Error("Invalide URL");
      } else {
        return UserSequelize.findOne({
          where: { pseudo: user.pseudo },
        })
          .then(() => {
            throw new Error("Token verifié.");
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    });
  }

  updatePasswordWithToken(token: any, newPassword: any): Promise<string> {
    return ResetTokenSequelize.findOne({
      where: { token: token },
    })
      .then((userToken) => {
        if (!userToken) {
          throw new Error("Le token a expiré");
        } else {
          return UserSequelize.findOne({
            where: {
              pseudo: userToken.pseudo,
            },
          })
            .then((userEmail) => {
              if (!userEmail) {
                throw new Error("Cette adresse mail n'existe pas");
              } else {
                const hash = bcrypt.hashSync(newPassword, 10);
                return UserSequelize.update(
                  { password: hash },
                  { where: { pseudo: userEmail.pseudo } }
                )
                  .then(() => {
                    return ResetTokenSequelize.destroy({
                      where: {
                        pseudo: userToken.pseudo,
                        token: userToken.token,
                      },
                    })
                      .then(() => {
                        return "Mot de passe changé avec succès";
                      })
                      .catch((err) => {
                        throw new Error(err);
                      });
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAllExistingEmails(): Promise<string[]> {
    return UserSequelize.findAll({
      attributes: ["email"],
    })
      .then((users: any) => {
        if (users.length != 0) {
          return users;
        } else {
          throw new Error("Aucun utilisateur inscrit sur le site");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAllExistingPseudo(): Promise<string[]> {
    return UserSequelize.findAll({
      attributes: ["pseudo"],
    })
      .then((users: any) => {
        if (users.length != 0) {
          return users;
        } else {
          throw new Error("Aucun utilisateur inscrit sur le site");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
