import prisma from "../config/database.js";

async function create({ email, password, name, birthday, imgProfileUrl }) {
  return prisma.user.create({
    data: { email, password, name, birthday, imgProfileUrl },
  });
}

async function findUniqueEmail(email) {
  return prisma.user.findFirst({
    where: { email },
  });
}

const userRepository = {
  create,
  findUniqueEmail,
};

export default userRepository;
