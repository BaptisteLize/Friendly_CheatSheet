# Controller Wrapper
```js
export default function controllerWrapper(middlewareFunction) {
  return async (req, res, next) => {
    try {
      await middlewareFunction(req, res, next);
    } catch (error) {
      return next(error); 
    }
  };
}
```
