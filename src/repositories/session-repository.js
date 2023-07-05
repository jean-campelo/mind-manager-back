import prisma from "../config/database.js";

async function create({ userId, token }) {
  return prisma.session.create({
    data: { userId, token },
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;
