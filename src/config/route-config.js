module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const menuRoutes = require("../routes/menus");

      app.use(staticRoutes);
      app.use(menuRoutes);
    }
  }