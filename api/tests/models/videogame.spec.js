const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: false }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Videogame.create({ name: "Super Mario Bros" });
      });
    });
    describe("description", () => {
      it("should throw an error if description is null", (done) => {
        Videogame.create({ name: "Super Mario Bros" })
          .then(() => done(new Error("It requires a valid description")))
          .catch(() => done());
      });
      it("should work when its a valid description", () => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "Classic game",
        }).then(() => done());
      });
    });

    describe("image", () => {
      it("should throw an error if image is null", (done) => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "Classic game",
        })
          .then(() => done(new Error("It requires a valid image")))
          .catch(() => done());
      });

      it("should work when its a valid image", () => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "Classic game",
          image: "https://example.com/image.jpg",
        }).then(() => done());
      });
    });

    describe("rating", () => {
      it("should throw an error if rating is null", (done) => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "Classic game",
          image: "https://example.com/image.jpg",
        })
          .then(() => done(new Error("It requires a valid rating")))
          .catch(() => done());
      });

      it("should throw an error if rating is below 0", (done) => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "Classic game",
          image: "https://example.com/image.jpg",
          rating: -1,
        })
          .then(() => done(new Error("Rating should be valid")))
          .catch(() => done());
      });

      it("should throw an error if rating is above 5", (done) => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "Classic game",
          image: "https://example.com/image.jpg",
          rating: 6,
        })
          .then(() => done(new Error("Rating should be valid")))
          .catch(() => done());
      });

      it("should work when its a valid rating", (done) => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "Classic game",
          image: "https://example.com/image.jpg",
          rating: 4.5,
        }).catch(() => done());
      });
    });
  });
});
