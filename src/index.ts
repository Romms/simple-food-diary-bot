import {Server} from "./server";

const {TELEGRAM_TOKEN, MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_PUBLIC_KEY, MAILGUN_SMTP_LOGIN, MAILGUN_SMTP_PASSWORD, MAILGUN_SMTP_PORT, MAILGUN_SMTP_SERVER,} = process.env;

const server = new Server({
    telegramToken: TELEGRAM_TOKEN || '',
    mailgun: {
        apiKey: MAILGUN_API_KEY || '',
        domain: MAILGUN_DOMAIN || '',
        publicKey: MAILGUN_PUBLIC_KEY || '',
        smtpLogin: MAILGUN_SMTP_LOGIN || '',
        smtpPassword: MAILGUN_SMTP_PASSWORD || '',
        smtpPort: MAILGUN_SMTP_PORT || '',
        smtpServer: MAILGUN_SMTP_SERVER || '',
    }
});

server.launch();
