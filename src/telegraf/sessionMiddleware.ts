interface Options<T> {
    getDefaultState: () => T,
    getSessionKey: (any) => string;
}

export function createSessionMiddleware<T>(opts: Partial<Options<T>> & Pick<Options<T>, 'getDefaultState'>) {
    const store: Map<string, T> = new Map();
    const options: Options<T> = {
        getSessionKey: (ctx) => ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`,
        ...opts
    };

    return (ctx, next) => {
        const sessionKey = options.getSessionKey(ctx);

        if (!sessionKey) {
            return next(ctx)
        }

        return Promise.resolve(store.get(sessionKey))
            .then(state => state || options.getDefaultState())
            .then(session => {
                Object.defineProperty(ctx, 'session', {
                    get: () => session,
                    set: newValue => session = Object.assign({}, newValue)
                });

                return next(ctx).then(() => store.set(sessionKey, session))
            });
    }
}