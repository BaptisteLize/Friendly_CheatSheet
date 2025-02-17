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

middleware mainController - Gestion du formulaire de connexion/enregistrement : 

```js
async handleLoginForm(req,res) {
    try {
      const action = req.body.action;
      const { username, password } = req.body;
      if(action === "connect") {
        const authenticatedUser = await dataMapper.checkLogin(username, password);
        if(!authenticatedUser) {
          return res.redirect("/login/?denied=true");
        }
        req.session.user = {
          id: authenticatedUser.id,
          username: authenticatedUser.username,
          role: authenticatedUser.role
        };
        return res.redirect("/login/?allowed=true");
      } else if (action === "register") {
        try {
          const { username, password } = req.body;
          const newUser = await dataMapper.registerUser(username, password);
          req.session.user = {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
          };
          return res.redirect("/login/?valid=true");
        } catch (error) {
          console.error(error);
          return res.redirect("/login/?taken=true");
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },
```
