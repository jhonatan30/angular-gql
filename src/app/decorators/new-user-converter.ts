export function newUserConverter(target: any, key: string) {
    let value: any;

    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: () => value ? 'This is a new user' : 'Welcome back',
            set: (v) => { value = v; },
            enumerable: true,
            configurable: true
        });
    }
}
