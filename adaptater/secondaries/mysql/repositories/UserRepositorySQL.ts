import User from "../../../../core/domain/User";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import UserSequelize from "../entities/User.model";
import bcrypt from "bcrypt";
import ResetTokenSequelize from "../entities/ResetToken.model";
import TokenDomain from "../../../../core/domain/Token.domain";

export default class UserRepositorySQL implements UserRepository {
  checkEmailConfirmed(pseudo: any): Promise<boolean> {
    return UserSequelize.findOne({
      where: {
        pseudo: pseudo,
      },
    })
      .then((user) => {
        if (user?.emailConfirmed) {
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
    throw new Error("Method not implemented.");
  }
  register(user: User): Promise<User> {
    const userData = {
      pseudo: user.pseudo,
      email: user.email,
      mdp: user.mdp,
      mdp2: user.mdp2,
      admin: user.admin,
      abonneNews: user.abonneNews,
    };

    return UserSequelize.findOne({
      where: {
        pseudo: user.pseudo,
      },
    })
      .then((user: any) => {
        if (!user) {
          if (userData.mdp === userData.mdp2) {
            const hash = bcrypt.hashSync(userData.mdp, 10);
            userData.mdp = hash;
            return UserSequelize.create(userData)
              .then((user: any) => {
                return user;
              })
              .catch((err) => {
                throw new Error(err);
              });
          } else {
            throw new Error("Les mots de passe ne sont pas identiques.");
          }
        } else {
          throw new Error("L'utilisateur existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  login(pseudo: any, password: any): Promise<TokenDomain> {
    return UserSequelize.findOne({
      where: {
        pseudo: pseudo,
      },
    })
      .then((user: any) => {
        if (!user) {
          throw new Error("Mot de passe et/ou pseudo incorrect");
        } else if (!user.emailConfirmed) {
          throw new Error(
            "Vous devez vérifier votre adresse mail avant de pouvoir vous connecter ! :)"
          );
        } else {
          if (bcrypt.compareSync(password, user.mdp)) {
            return user;
          } else {
            throw new Error("Mot de passe et/ou pseudo incorrect");
          }
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  existByPseudo(pseudo: any): Promise<boolean> {
    return UserSequelize.findOne({
      where: {
        pseudo: pseudo,
      },
    }).then((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
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
        abonneNews: true,
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

  updatePassword(
    pseudo: any,
    oldPassword: any,
    newPassword: any,
    confirmNewPassword: any
  ): Promise<User> {
    return UserSequelize.findOne({
      where: {
        pseudo: pseudo,
      },
    })
      .then((user: any) => {
        if (!user) {
          throw new Error("Il n'y aucun utilisateur avec ce pseudo");
        } else {
          if (bcrypt.compareSync(oldPassword, user.mdp)) {
            if (newPassword === confirmNewPassword) {
              const hash = bcrypt.hashSync(newPassword, 10);
              return UserSequelize.update(
                { mdp: hash },
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
            } else {
              throw new Error("Les deux mots de passe ne sont pas identiques.");
            }
          } else {
            throw new Error("Mot de passe incorrect!");
          }
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  update(user: User): Promise<User> {
    return UserSequelize.findOne({
      where: {
        pseudo: user.pseudo,
      },
    })
      .then((user) => {
        if (user) {
          return UserSequelize.update(
            {
              email: user.email,
              abonneNews: user.abonneNews,
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
        } else {
          throw new Error("Pas d'utilisateur avec ce pseudo");
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

  forgetPassword(email: any): Promise<string> {
    throw new Error("Method not implemented.");
  }

  checkValideToken(token: any): Promise<string> {
    return ResetTokenSequelize.findOne({
      where: {
        resettoken: token,
      },
    }).then((user) => {
      if (!user) {
        throw new Error("Invalide URL");
      } else {
        return UserSequelize.findOne({
          where: { pseudo: user.userId },
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
      where: { resettoken: token },
    })
      .then((userToken) => {
        if (!userToken) {
          throw new Error("Le token a expiré");
        } else {
          return UserSequelize.findOne({
            where: {
              pseudo: userToken.userId,
            },
          })
            .then((userEmail) => {
              if (!userEmail) {
                throw new Error("Cette adresse mail n'existe pas");
              } else {
                const hash = bcrypt.hashSync(newPassword, 10);
                return UserSequelize.update(
                  { mdp: hash },
                  { where: { pseudo: userEmail.pseudo } }
                )
                  .then(() => {
                    return ResetTokenSequelize.destroy({
                      where: {
                        userId: userToken.userId,
                        resettoken: userToken.resettoken,
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

  sendFromContact(email: any, subject: any, message: any): Promise<string> {
    throw new Error("Method not implemented.");
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
