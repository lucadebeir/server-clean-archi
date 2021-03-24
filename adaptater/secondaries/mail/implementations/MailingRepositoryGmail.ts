import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import { smtpTransport } from "../config/MailConfig";
import ejs from 'ejs';

export default class MailingRepositoryGmail implements MailingRepository {
  sendMail(data: any): Promise<string> {
    const TEMPLATES = {
      subscribe: {
        fileName: 'new_recipes.ejs',
        subject: "Nouvelle recette sur Marine's recipes",
      },
    };

    const filePath = `${__dirname}/templates/${TEMPLATES.subscribe.fileName}`;

    ejs.renderFile(filePath, data, {}, (e, content) => {
      if (e) return e;
      const mailOptions = {
        from: 'marinesrecipes@gmail.com',
        to: data.email,
        subject: TEMPLATES.subscribe.subject,
        html: content,
      };

      console.log(mailOptions)

      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
      });
    });

    throw new Error("Method not implemented.");
  }
}
