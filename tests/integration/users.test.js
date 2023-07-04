import supertest from "supertest";
import server from "../../src/server";
import { cleanDb } from "../helpers.js";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";

const api = supertest(server);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /user", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await api.post("/user/sign-up");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: [faker.lorem.word()] };
    const response = await api.post("/user/sign-up").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});

describe("when body is valid", () => {
  const generateValidBody = {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
    name: faker.internet.userName(),
    birthday: faker.date.birthdate(),
    imgProfileUrl: faker.internet.avatar(),
  };

  it("should response with status 201 and create new user when given email is unique", async () => {
    const response = await api.post("/user/sign-up").send(generateValidBody);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({
      email: generateValidBody.email,
      name: generateValidBody.name,
      imgProfileUrl: generateValidBody.imgProfileUrl,
    });
  });

  it("should response with status 409 when email is already registered", async () => {
    const response = await api.post("/user/sign-up").send(generateValidBody);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});
