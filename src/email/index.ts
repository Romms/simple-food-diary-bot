import * as createMailgun from 'mailgun-js';

export class Email {
    private mailgun;

    constructor(options: { apiKey: string; domain: string }) {
        this.mailgun = createMailgun(options);
    }

    sendCalendarInvite(email, text) {
        const data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: 'rommssh@gmail.com, ' + email,
            subject: 'Hello',
            text,
        };

        return this.mailgun.messages().send(data)
            .then(body => console.log('[MAILGUN]', body))
            .catch(error => {
                console.error('[MAILGUN]', error);
                return Promise.reject(error);
            })
    }
}
