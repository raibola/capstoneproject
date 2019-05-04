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
       price: 10
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
        expect(body).toContain("Pork with soy and vinegar");
        expect(body).toContain(10);
        done();
      });
    });

  });
});
