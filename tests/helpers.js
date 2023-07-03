import prisma from "../src/config/database.js";

export async function cleanDb() {
  await prisma.user.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.consults.deleteMany({});
}
