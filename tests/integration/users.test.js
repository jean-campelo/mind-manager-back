import supertest from "supertest";
import server from "../../src/server";
import { cleanDb } from "../helpers.js";

const api = supertest(server);

beforeAll(async () => {
  await cleanDb();
});
