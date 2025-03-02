import express from "express";
import cors from "cors";
import MailingRepositoryGmail from "../../../secondaries/mail/implementations/MailingRepositoryGmail";

const mailing = express.Router();
mailing.use(cors());

const mailingRepository: MailingRepositoryGmail = new MailingRepositoryGmail();

mailing.post("/", (req, res) => {
  try {
    mailingRepository.sendMail(req.query);
    res.status(200).json({ message: "email sent successfully" });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

export = mailing;
