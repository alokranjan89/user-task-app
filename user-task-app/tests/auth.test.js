const request = require("supertest");
const app = require("../src/server");

describe("Auth API", () => {

  test("Register user", async () => {

    const res = await request(app)
      .post("/auth/register")
      .send({
        email: `test${Date.now()}@test.com`,
        password: "123456"
      });

    expect(res.statusCode).toBe(201);

  });

  test("Login user", async () => {

    const email = `login${Date.now()}@test.com`;

    await request(app)
      .post("/auth/register")
      .send({
        email,
        password: "123456"
      });

    const res = await request(app)
      .post("/auth/login")
      .send({
        email,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

  });

});