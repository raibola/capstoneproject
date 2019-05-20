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
    },
  new(req, res, next){
    res.render("menus/new")
  },
  create(req, res, next){
    let newMenu = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imgsrc: req.body.imgsrc
    };
    menuQueries.addMenu(newMenu, (err, menu) =>{
      if(err){
        res.redirect(500, "/menu/new");
      } else {
        res.redirect(303, `/menu/${menu.id}`);
      }
    })
  },
  show(req, res, next){

    //#1
         menuQueries.getMenu(req.params.id, (err, menu) => {
    
    //#2
           if(err || menu == null){
             res.redirect(404, "/");
           } else {
             res.render("menus/show", {menu});
           }
         });
       },
  destroy(req, res, next){
    menuQueries.deleteTopic(req.params.id, (err, menu) => {
      if(err){
        res.redirect(500, `/menu/${menu.id}`)
      } else {
        res.redirect(303, "/menu")
      }
    })
  },
  edit(req, res, next){
    menuQueries.getMenu(req.params.id, (err, menu) => {
      if(err || menu == null){
        res.redirect(404, "/");
      } else {
        res.render("menus/edit", {menu});
      }
    });
  },
  update(req, res, next){

    //#1
         menuQueries.updateMenu(req.params.id, req.body, (err, menu) => {
    
    //#2
           if(err || menu == null){
             res.redirect(404, `/menu/${req.params.id}/edit`);
           } else {
             res.redirect(`/menu/${menu.id}`);
           }
         });
       }
  }