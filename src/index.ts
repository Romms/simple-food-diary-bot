import {Server} from "./server";

const server = new Server({
    telegramToken: process.env.TELEGRAM_TOKEN || ''
});
server.launch();