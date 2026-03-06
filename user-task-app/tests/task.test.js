const request = require("supertest");
const app = require("../src/server");

let token;

beforeAll(async () => {

  // register user
  await request(app)
    .post("/auth/register")
    .send({
      email: "tasktest@test.com",
      password: "123456"
    });

  // login user
  const res = await request(app)
    .post("/auth/login")
    .send({
      email: "tasktest@test.com",
      password: "123456"
    });

  token = res.body.token;
});

describe("Task API", () => {

  test("Create task without title should fail", async () => {

    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);

  });

});