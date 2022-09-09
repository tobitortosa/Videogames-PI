/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
};

describe("Genres", () => {
  describe("Get genres", () => {
    it("GET should respond with a status of 200", () => {
      return agent.get("/genres").expect((res) => {
        expect(res.status).equal(200);
      });
    });
  });
});
