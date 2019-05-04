const menuQueries = require("../db/queries.menus.js");

module.exports = {
  index(req, res, next){
      menuQueries.getAllMenus((err, menus) => {

        //#3
                if(err){
                  res.redirect(500, "static/index");
                } else {
                  res.render("menus/index", {menus});
                }
              })
    }
  }