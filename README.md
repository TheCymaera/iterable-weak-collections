# Iterable Weak Collections

## Installation
Install via [NPM](https://www.npmjs.com/package/iterable-weak-collections).
```shell
npm install iterable-weak-collections
```

## Information
This library adds `IterableWeakSet` and `IterableWeakMap`. They implement the built-in `Set` and `Map` interfaces.

```typescript
import { IterableWeakMap, IterableWeakSet } from "iterable-weak-collections";
const map = new IterableWeakMap();
const set = new IterableWeakSet();
```


```typescript
class IterableWeakMap<K extends Object, T> implements Map<K,T> {
	
}

class IterableWeakSet<K extends Object, T> implements Set<K,T> {
	
}
```

## Technical Details
This library is implemented using `WeakRef`, which is supported in Node and most major browsers.

## Example Uses
- Sub-pub
- Code diagnostics and monitoring

## License
MIT License<br/>
<br/>
All files can be used for commercial or non-commercial purposes. Do not resell. Attribution is appreciated but not due.