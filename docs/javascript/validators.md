# VALIDATORS

```js
/**
 * Verify if a value in string format represents a positive integer.
 * @param {string} value - The value to verify.
 * @returns {boolean} True if the value is a positive integer, false otherwise.
 */
export function isPositiveInteger(value) {
  return /^\d+$/.test(value);
}
```
