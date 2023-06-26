import httpStatus from "http-status";
import userService from "../services/user-service.js";

async function signUp(req, res) {
  const { email, password, name, birthday, imgProfileUrl } = req.body;

  try {
    const newUser = await userService.createUser({
      email,
      password,
      name,
      birthday,
      imgProfileUrl,
    });
    return res.status(httpStatus.CREATED).send(newUser);
  } catch (error) {
    if (error.name === "DuplicatedRegisterError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const userController = {
  signUp,
};

export default userController;
