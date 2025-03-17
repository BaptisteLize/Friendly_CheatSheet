# Config CORS environnement dev
```js
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));
```
Autorisera tous les fetch depuis les localhost ou les ip 127.0.0.1
