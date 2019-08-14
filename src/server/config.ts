export interface ServerConfig {
    telegramToken: string;
    mailgun: {
        apiKey: string;
        domain: string;
        publicKey: string;
        smtpLogin: string;
        smtpPassword: string;
        smtpPort: string;
        smtpServer: string;
    }
}
