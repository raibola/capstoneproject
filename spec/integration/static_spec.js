const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200 and have 'Welcome to Lil's BBQ!' in the body of the response", (done) => {

//#3
      request.get(base, (err, res, body) => {
        expect(body).toContain("Welcome to Lil's BBQ!");

//#4
        done();
      });
    });

  });
  describe("GET /about", () => {

    //#2
        it("should return status code 200 and have 'About Us' in the body of the response", (done) => {
    
    //#3
          request.get(base, (err, res, body) => {
            expect(body).toContain("About Us");
    
    //#4
            done();
          });
        });
    
      });

});
