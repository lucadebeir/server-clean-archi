import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import { smtpTransport } from "../config/MailConfig";
import ejs from "ejs";
import path from "path";
import { getEnvironment } from "../config/environmentFile";
import { TEMPLATES } from "./Template";

const environment: any = getEnvironment();

export default class MailingRepositoryGmail implements MailingRepository {
  sendMail(data: any): void {
    const filePath = path.join(
      __dirname,
      `../templates/${TEMPLATES["new_recipe"].fileName}`
    );

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
}
