module.exports = {
    index(req, res, next){
      res.render("static/index", {title: "Welcome to Lil's BBQ"});
    },
    about(req, res, next){
      res.render("static/about", {title: "About Us"});
    }
  }