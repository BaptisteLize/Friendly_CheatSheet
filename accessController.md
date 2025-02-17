middleware accessController  :

```js

const access = {
  isAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).send("Accès interdit");
    }
    next();
  },

  isAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    next();
  }
};

export default access;

```
