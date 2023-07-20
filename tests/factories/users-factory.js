import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database.js";

export async function createUser() {
  const password = faker.internet.password({ length: 6 });
  const hashedPassword = await bcrypt.hash(password, 12);

  const body = {
    email: faker.internet.email(),
    password: hashedPassword,
    name: faker.internet.userName(),
    birthday: faker.date.birthdate(),
    imgProfileUrl: faker.internet.avatar(),
  };

  return prisma.user.create({
    data: body,
  });
}

export async function createUserWithParams(body) {
  const password = body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  const data = { ...body, password: hashedPassword };

  return prisma.user.create({
    data,
  });
}
