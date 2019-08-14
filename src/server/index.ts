import Telegraf, {ContextMessageUpdate} from 'telegraf';
import {ServerConfig} from "./config";
import {createSession, Session} from "./session";
import {TextProcessor} from "../telegraf/commandsMiddleware";
import {Email} from "../email";

export interface OurContext extends ContextMessageUpdate {
    session: Session
}

const commandHanlers = {
    'set-email': ctx => {
        const email = (ctx.message && ctx.message.text || '').trim();
        ctx.session.email = email;
        TextProcessor.endCommand(ctx);
        return ctx.reply('Your email: `' + email + '`');
    }
};

export class Server {
    private bot: Telegraf<OurContext>;
    private textProcessor: TextProcessor;
    private email: Email;

    constructor(private readonly config: ServerConfig) {
        this.email = new Email({apiKey: config.mailgun.apiKey, domain: config.mailgun.domain});

        this.bot = new Telegraf(this.config.telegramToken);
        this.textProcessor = new TextProcessor(
            commandHanlers,
            async ctx => {
                await this.email.sendCalendarInvite(ctx.session.email, ctx.message && ctx.message.text || '');
                return ctx.reply('✅');
            }
        );

        this.bot.use(createSession());
    }

    private setup() {
        this.bot.start(ctx => ctx.reply('Welcome!'));
        this.bot.help(ctx => ctx.reply('Send me a message'));
        this.bot.on('message', this.textProcessor.middleware);
        this.bot.command('set-email', ctx => TextProcessor.startCommand(ctx, 'set-email'));
    }

    launch() {
        this.setup();
        this.bot.launch();
    }
}
