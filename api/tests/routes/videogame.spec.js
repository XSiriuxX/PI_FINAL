/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "Classic game",
  platforms: "Nintendo Switch",
  image: "https://example.com/super-mario-bros.jpg",
  releasedate: "1985-09-13",
  rating: 4.8,
  gamegenres: ["Action", "Adventure"],
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });

  describe("GET /videogames/:id", () => {
    it("should get a specific videogame by id", async () => {
      const response = await agent.get("/videogames/1");
      expect(response.status).to.equal(200);
    });

    it("should return 404 for nonexistent videogame id", () => {
      return agent.get("/videogames/9999999").expect(404);
    });
  });

  describe("POST /videogames", () => {
    it("should create a new videogame", async () => {
      let newvideogame = {
        name: "Super Mario Bross",
        description: "Classic game",
        platforms: "Nintendo Switch",
        image: "https://example.com/super-mario-bros.jpg",
        releasedate: "1985-09-13",
        rating: 4.8,
        genres: ["Action", "Adventure"],
      };
      const response = await agent.post("/videogames").send(newvideogame);
      expect(response.status).to.equal(200);
    });

    it("should return 400 for invalid data", () => {
      const invalidVideogame = {
        name: "Invalid Game",
      };

      return agent.post("/videogames").send(invalidVideogame).expect(400);
    });
  });
});
