import Telegraf, {ContextMessageUpdate} from 'telegraf';
import {ServerConfig} from "./config";
import {createSession, Session} from "./session";
import {TextProcessor} from "../telegraf/commandsMiddleware";

export interface OurContext extends ContextMessageUpdate {
    session: Session
}

export class Server {
    private bot: Telegraf<OurContext>;
    private textProcessor: TextProcessor;

    constructor(private readonly config: ServerConfig) {
        this.bot = new Telegraf(this.config.telegramToken);
        this.textProcessor = new TextProcessor({
                'set-email': ctx => {
                    const email = (ctx.message && ctx.message.text || '').trim();
                    ctx.session.email = email;
                    this.textProcessor.endCommand(ctx);
                    return ctx.reply('Your email: `' + email + '`');
                }
            },
            ctx => ctx.reply('✅')
        );

        this.bot.use(createSession());
    }

    private setup() {
        this.bot.start(ctx => ctx.reply('Welcome!'));
        this.bot.help(ctx => ctx.reply('Send me a message'));
        this.bot.on('message', this.textProcessor.middleware);
        this.bot.command('set-email', ctx => this.textProcessor.startCommand(ctx, 'set-email'));
    }

    launch() {
        this.setup();
        this.bot.launch();
    }
}
