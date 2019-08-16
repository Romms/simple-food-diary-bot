import {CommandName} from "../server/session";
import {Middleware} from "telegraf";
import {OurContext} from "../server";

export class TextProcessor {
    constructor(
        private handlers: { [key in CommandName]: Middleware<OurContext> },
        private defaultHandler: Middleware<OurContext>
    ) {

    }

    static startCommand(ctx: OurContext, commandName: CommandName) {
        ctx.session.activeCommand = commandName;
    }

    static endCommand(ctx: OurContext) {
        ctx.session.activeCommand = '';
    }

    middleware = (ctx: OurContext) => {
        const handler = this.handlers[ctx.session.activeCommand];
        return handler ? handler(ctx) : this.defaultHandler(ctx);
    };
}
