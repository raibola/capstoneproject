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
  },
  addMenu(newMenu, callback){
    return Menu.create({
      name: newMenu.name,
      description: newMenu.description,
      price: newMenu.price,
      imgsrc: newMenu.imgsrc
    })
    .then((menu) => {
      callback(null, menu);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getMenu(id, callback){
    return Menu.findById(id)
    .then((menu) => {
      callback(null, menu);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteTopic(id, callback){
    return Menu.destroy({
      where: {id}
    })
    .then((menu) => {
      callback(null, menu);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateMenu(id, updatedMenu, callback){
    return Menu.findById(id)
    .then((menu) => {
      if(!menu){
        return callback("Menu item not found");
      }
      menu.update(updatedMenu, {
        fields: Object.keys(updatedMenu)
      })
      .then(() => {
        callback(null, menu);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}