import { IterableWeakSet } from "./IterableWeakSet.js";

export class IterableWeakMap<K extends Object, T> implements Map<K, T> {
	constructor(iterable: Iterable<[K,T]>) {
		if (!iterable) return;
		for (const [key, value] of iterable) this.set(key, value);
	}

	get size(): number {
		return this._refs.size;
	}

	has(key: K): boolean {
		return this._weak.has(key);
	}

	get(key: K): T|undefined {
		return this._weak.get(key);
	}

	set(key: K, value: T): this {
		this._weak.set(key, value);
		this._refs.add(key);
		return this;
	}

	delete(key: K): boolean {
		this._refs.delete(key);
		return this._weak.delete(key);
	}

	clear(): void {
		this._weak = new WeakMap;
		this._refs.clear();
	}

	keys(): IterableIterator<K> {
		return this._refs.values();
	}

	*values(): IterableIterator<T> {
		for (const key of this.keys()) {
			yield this._weak.get(key)!;
		}
	}

	*entries(): IterableIterator<[K,T]> {
		for (const key of this.keys()) {
			yield [key, this._weak.get(key)!];
		}
	}

	forEach(callbackfn: (value: T, key: K, map: this) => void, thisArg?: any): void {
		for (const [key, value] of this.entries()) callbackfn.call(thisArg, value, key, this); 
	}

	[Symbol.iterator](): IterableIterator<[K,T]> {
		return this.entries();
	}
	
	[Symbol.toStringTag]: string;

	private _weak = new WeakMap<K,T>();
	private readonly _refs = new IterableWeakSet<K>();
}