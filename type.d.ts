declare class WeakRef<T extends Object> {
	constructor(value: T);
	deref(): T|undefined;
}

declare class FinalizationRegistry<T, H, U extends object> {
    constructor(callback? : (heldValue : H) => void)
    register(target : T, heldValue : H, unregisterToken? : U): void
    unregister(unregisterToken : U): void
}