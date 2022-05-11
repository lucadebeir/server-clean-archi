import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import {smtpTransport} from "../config/MailConfig";
import ejs from "ejs";
import path from "path";
import {getEnvironment} from "../config/environmentFile";
import {TEMPLATES} from "./Template";
import User from "../../../../core/domain/User";

const environment: any = getEnvironment();

export default class MailingRepositoryGmail implements MailingRepository {
  sendMail(data: any): void {
    const filePath = path.join(`./templates/${TEMPLATES["new_recipe"].fileName}`);

    ejs.renderFile(filePath, data, {}, (e, content) => {
      if (e) return e;
      const mailOptions = {
        from: environment.AUTH_USER,
        to: data.email,
        subject: TEMPLATES["new_recipe"].subject,
        html: content,
      };

      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
      });
    });
  }
  sendMailWhenNewRecipe(data: any): void {
    const filePath = path.join(`./templates/new-recipe/${TEMPLATES["new_recipe"].fileName}`);

    const dataForTemplate = {
      link: "https://marinesrecipes.fr/recipe/" + data.recipe.id,
      pseudo: data.user.get("name"),
      name: data.recipe.name,
      mot: data.recipe.mot,
    };

    ejs.renderFile(filePath, dataForTemplate, {}, (e, content) => {
      if (e) return e;
      const mailOptions = {
        from: environment.AUTH_USER,
        to: data.user.get("address"),
        subject: TEMPLATES["new_recipe"].subject,
        html: content,
        attachments: [
          {
            filename: "logo.jpeg",
            path: path.join(`./templates/images/logo.jpeg`),
            cid: "logo",
          },
          {
            filename: "facebook.png",
            path: path.join(`./templates/images/facebook.png`),
            cid: "facebook",
          },
          {
            filename: "instagram.jpeg",
            path: path.join(`./templates/images/instagram.png`),
            cid: "instagram",
          },
          {
            filename: data.recipe.images[0].name,
            path: data.recipe.images[0].link,
            cid: "image",
          },
        ],
      };

      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
      });
    });
  }

  sendMailAfterRegister(user: User, link: any): void {
    const filePath = path.join(`./templates/register/${TEMPLATES["register"].fileName}`);

    const data = {
      link: link,
      pseudo: user.pseudo,
    };

    ejs.renderFile(filePath, data, {}, (e, content) => {
      if (e) return e;
      const mailOptions = {
        from: environment.AUTH_USER,
        to: user.email,
        subject: TEMPLATES["register"].subject,
        html: content,
        attachments: [
          {
            filename: "logo.jpeg",
            path: path.join(`./templates/images/logo.jpeg`),
            cid: "logo",
          },
          {
            filename: "facebook.png",
            path: path.join(`./templates/images/facebook.png`),
            cid: "facebook",
          },
          {
            filename: "instagram.jpeg",
            path: path.join(`./templates/images/instagram.png`),
            cid: "instagram",
          },
        ],
      };
      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
      });
    });
  }

  sendMailWhenUserForgetPassword(data: any): void {
    const filePath = path.join(`./templates/forget-password/${TEMPLATES["forget_password"].fileName}`);

    ejs.renderFile(filePath, data, {}, (e, content) => {
      if (e) return e;
      const mailOptions = {
        from: environment.AUTH_USER,
        to: data.email,
        subject: TEMPLATES["forget_password"].subject,
        html: content,
        attachments: [
          {
            filename: "logo.jpeg",
            path: path.join(`./templates/images/logo.jpeg`),
            cid: "logo",
          },
          {
            filename: "facebook.png",
            path: path.join(`./templates/images/facebook.png`),
            cid: "facebook",
          },
          {
            filename: "instagram.jpeg",
            path: path.join(`./templates/images/instagram.png`),
            cid: "instagram",
          },
        ],
      };

      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        return info;
      });
    });
  }

  sendMailFromContact(data: any): void {
    const filePath = path.join(`./templates/contact/${TEMPLATES["contact"].fileName}`);

    ejs.renderFile(filePath, data, {}, (e, content) => {
      if (e) return e;
      const mailOptions = {
        from: data.email,
        to: environment.AUTH_USER,
        subject: data.subject,
        html: content,
        attachments: [
          {
            filename: "logo.jpeg",
            path: path.join(`./templates/images/logo.jpeg`),
            cid: "logo",
          },
          {
            filename: "facebook.png",
            path: path.join(`./templates/images/facebook.png`),
            cid: "facebook",
          },
          {
            filename: "instagram.jpeg",
            path: path.join(`./templates/images/instagram.png`),
            cid: "instagram",
          },
        ],
      };

      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
      });
    });
  }
}
