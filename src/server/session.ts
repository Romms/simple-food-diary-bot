import {createSessionMiddleware} from "../telegraf/sessionMiddleware";

export type CommandName = 'set-email';
export interface Session {
    email: string;
    activeCommand: CommandName | '';
}

const DEFAULT_SESSION: Required<Session> = {
    email: '',
    activeCommand: '',
};

export function createSession() {
    return createSessionMiddleware<Session>({
        getDefaultState: () => ({...DEFAULT_SESSION})
    })
}
