const routes = [
    { href: "/user", title: "users" },
    { href: "/comments", title: "Comments" },
    { href: "/logout", title: "Logout" },
  ];
  
  const authRoutes = [
    { href: "/home", title: "Login" },
    { href: "/signup", title: "Sign Up" },
  ];
  
  module.exports = function navLinks(req, res, next) {
    if (req.session.currentUser) {
      res.locals.routes = routes;
    } else {
      res.locals.routes = authRoutes;
    }
    // locals
    next();
  };
