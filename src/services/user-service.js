import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user-repository.js";
import sessionRepository from "../repositories/session-repository.js";
import { emailAlreadyRegistered, emailOrPasswordInvalid } from "./errors.js";

async function validateEmail(email) {
  const userWithSameEmail = await userRepository.findUniqueEmail(email);

  if (userWithSameEmail) throw emailAlreadyRegistered();
}

async function validateUser(email) {
  const isValidUser = await userRepository.findUniqueEmail(email);

  if (!isValidUser) throw emailOrPasswordInvalid();
  return isValidUser;
}

async function validatePassword(password, userPassword) {
  const isValidPassword = await bcrypt.compare(password, userPassword);

  if (!isValidPassword) throw emailOrPasswordInvalid();
}

async function createSession(userId) {
  const token = jwt.sign(userId, process.env.JWT_SECRET);
  await sessionRepository.create({ userId, token });
  return token;
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

async function loginUser({ email, password }) {
  const user = await validateUser(email);
  await validatePassword(password, user.password);
  const token = await createSession(user.id);

  delete user.password;

  return { ...user, token };
}

const userService = {
  createUser,
  loginUser,
};

export default userService;
