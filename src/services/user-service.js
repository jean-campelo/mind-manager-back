import bcrypt from "bcrypt";
import userRepository from "../repositories/user-repository.js";
import { emailAlreadyRegistered } from "./errors.js";

async function validateEmail(email) {
  const userWithSameEmail = await userRepository.findUniqueEmail(email);

  if (userWithSameEmail) throw emailAlreadyRegistered();
}

async function createUser({ email, password, name, birthday, imgProfileUrl }) {
  await validateEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  const registerNewUser = await userRepository.create({
    email,
    password: hashedPassword,
    name,
    birthday,
    imgProfileUrl,
  });
  return registerNewUser;
}

const userService = {
  createUser,
};

export default userService;
