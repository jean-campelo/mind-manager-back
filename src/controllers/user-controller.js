import httpStatus from "http-status";
import userService from "../services/user-service.js";

async function signUp(req, res) {
  const { email, password, name, birthday, imgProfileUrl } = req.body;

  try {
    await userService.createUser({
      email,
      password,
      name,
      birthday,
      imgProfileUrl,
    });

    return res.status(httpStatus.CREATED).send({ email, name, imgProfileUrl });
  } catch (error) {
    if (error.name === "DuplicatedRegisterError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser({ email, password });

    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    if (error.name === "LoginError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const userController = {
  signUp,
  login,
};

export default userController;
