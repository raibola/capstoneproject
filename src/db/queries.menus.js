const Menu = require("./models").Menu;

module.exports = {

//#1
  getAllMenus(callback){
    return Menu.all()

//#2
    .then((menus) => {
      callback(null, menus);
    })
    .catch((err) => {
      callback(err);
    })
  }
}