import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger";
import config from "config";

// async function createMailer() {
//   const creds = await nodemailer.createTestAccount();

//   log.info({ creds });
// }

// createMailer();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.info(err, "error sending mail");
      return;
    }

    log.info(`previewUrl : ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
