export class IterableWeakSet<T extends Object> implements Set<T> {
	constructor(iterable?: Iterable<T>) {
		if (!iterable) return;
		for (const value of iterable) this.add(value);
	}

	get size(): number {
		this._cleanup();
		return this._refs.size;
	}

	has(value: T): boolean {
		this._cleanup();
		return this._weak.has(value);
	}

	add(key: T): this {
		if (!this._weak.has(key)) {
			const ref = new WeakRef(key);
			this._weak.set(key, ref);
			this._refs.add(ref);
			this._finalizer.register(key, ref);
		}
		this._cleanup();
		return this;
	}

	delete(key: T): boolean {
		this._cleanup();
		const ref = this._weak.get(key);
		if (ref) this._refs.delete(ref);
		return this._weak.delete(key);
	}

	clear(): void {
		this._weak = new WeakMap;
		this._refs.clear();
	}

	*keys(): IterableIterator<T> {
		this._cleanup();
		for (const ref of this._refs) {
			const key = ref.deref()!;
			yield key;
		}
	}

	values(): IterableIterator<T> {
		return this.keys();
	}

	*entries(): IterableIterator<[T,T]> {
		for (const value of this.values()) yield [value, value];
	}

	forEach(callbackfn: (value: T, key: T, set: this) => void, thisArg?: any): void {
		for (const value of this.values()) callbackfn.call(thisArg, value, value, this); 
	}

	[Symbol.iterator](): IterableIterator<T> {
		return this.values();
	}
	
	[Symbol.toStringTag]: string;

	private _weak = new WeakMap<T,WeakRef<T>>();
	private readonly _refs = new Set<WeakRef<T>>();
	private readonly _finalizer = new FinalizationRegistry<WeakRef<T>>((value)=>{
		this._refs.delete(value);
	});

	private _cleanup() {
		for (const ref of this._refs) {
			if (!ref.deref()) this._refs.delete(ref);
		}
	}
}