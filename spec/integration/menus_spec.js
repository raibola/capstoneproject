const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/menu/";
const sequelize = require("../../src/db/models/index").sequelize;
const Menu = require("../../src/db/models").Menu;

describe("routes : menu", () => {
  
  beforeEach((done) => {
    this.menu;
    sequelize.sync({force: true}).then((res) => {

     Menu.create({
       name: "Adobo",
       description: "Pork with soy and vinegar",
       price: 10,
       imgsrc: "https://placehold.it/150x80?text=IMAGE"
     })
      .then((menu) => {
        this.menu = menu;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });
  });

  describe("GET /menu", () => {

    it("should return a status code 200 and all menus", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Adobo");
        done();
      });
    });

  });

  describe("GET /menu/new", () => {

    it("should render a new menu form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Menu Item");
        done();
      });
    });

  });

  describe("POST /menu/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        name: "Pork BBQ",
        description: "Bbq strips made with soy, banana ketchup, garlic and brown sugar",
        price: 10,
        imgsrc: "https://placehold.it/150x80?text=IMAGE"
      }
    };

    it("should create a new menu item and redirect", (done) => {

//#1
      request.post(options,

//#2
        (err, res, body) => {
          Menu.findOne({where: {name: "Pork BBQ"}})
          .then((menu) => {
            expect(res.statusCode).toBe(303);
            expect(menu.price).toBe(10);
            expect(menu.description).toBe("Bbq strips made with soy, banana ketchup, garlic and brown sugar");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /menu/:id", () => {

    it("should render a view with the selected menu item", (done) => {
      request.get(`${base}${this.menu.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Adobo");
        done();
      });
    });

  });

  describe("POST /menu/:id/destroy", () => {

    it("should delete the menu item with the associated ID", (done) => {

//#1
      Menu.all()
      .then((menus) => {

//#2
        const menuCountBeforeDelete = menus.length;

        expect(menuCountBeforeDelete).toBe(1);

//#3
        request.post(`${base}${this.menu.id}/destroy`, (err, res, body) => {
          Menu.all()
          .then((menus) => {
            expect(err).toBeNull();
            expect(menus.length).toBe(menuCountBeforeDelete - 1);
            done();
          })

        });
      });

    });

  });

  describe("GET /menu/:id/edit", () => {

    it("should render a view with an edit menu item form", (done) => {
      request.get(`${base}${this.menu.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Menu Item");
        expect(body).toContain("Adobo");
        done();
      });
    });

  });

  describe("POST /menu/:id/update", () => {

    it("should update the menu item with the given values", (done) => {
       const options = {
          url: `${base}${this.menu.id}/update`,
          form: {
            name: "Palabok",
            description: "Seafood noodles with egg, shrimp and green onions",
            price: 10,
            imgsrc: "https://placehold.it/150x80?text=IMAGE"
          }
        };
//#1
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();
//#2
          Menu.findOne({
            where: { id: this.menu.id }
          })
          .then((menu) => {
            expect(menu.name).toBe("Palabok");
            done();
          });
        });
    });

  });

});
