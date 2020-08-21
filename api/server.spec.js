const supertest = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");
const { signToken } = require("../auth/auth-helpers");

describe("server", () => {
  const testUserRegister = {
    username: "Test from Test",
    password: "pass",
  };

  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /register", () => {
    it("Should return 201", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send(testUserRegister)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("Should return JSON", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send(testUserRegister)
        .then((res) => {
          expect(res.type).toMatch(/json/);
        });
    });
    it("Should add users to the db", async () => {
        await supertest(server).post("/api/auth/register").send(testUserRegister)

        const users = await db("users")
        expect(users).toHaveLength(1)
    })
    it("Should return 400 if missing req data", () => {
        return supertest(server)
        .post("/api/auth/register")
        .then(res => {
            expect(res.status).toBe(400)
        })
    })
  });

  describe("POST /login", () => {
    

    it("Should return 200", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send({ username: "Test", password: "pass" });

      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "Test", password: "pass" })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("Should return JSON", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "Test", password: "pass" })
        .then((res) => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
});
